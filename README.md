[README.md](https://github.com/user-attachments/files/33377544/README.md)
# Asset Lending Protocol

**A Solana/Anchor learning project for collateral-backed borrowing and lending-accounting experiments.**

Rust · Anchor 0.32.1 · SPL Token · TypeScript · Next.js UI prototype

> **Status:** Educational, local-development prototype. The repository contains lending instructions and test scenarios, but is not audited or production-ready. Use disposable localnet wallets and test tokens only—not real funds.

## Problem and approach

Collateral-backed lending requires token custody, borrower debt, price inputs, interest, and liquidation rules to remain consistent across transactions. This project explores those responsibilities through an Anchor program with explicit account state, SPL Token cross-program invocations (CPIs), and a program-derived vault authority.

The baseline uses example gold-collateral and cash tokens. These are test assets; the code does not establish physical gold backing or issue real USDC.

## Choose the right branch

| Branch | Scope |
|---|---|
| `main` | Baseline program: collateral deposits, borrowing, repayment, debt-free withdrawals, liquidation, and fixed-rate interest accrual. This README's baseline setup refers to this branch. |
| `feature/ui-development` | Adds a Next.js wallet/health-factor interface around the baseline program. The UI is still a scaffold. |
| `feature/multi-asset-registry` | Adds an asset-registration instruction, per-asset configuration, a utilization-based rate function, borrow-cap accounting, treasury-related code, and additional UI components. Integration is incomplete. |
| `master` | Earlier program iteration; not the recommended starting point. |

Branch-specific account layouts, instruction arguments, tests, and generated IDLs are not interchangeable. In particular, `initialize_market` changes between `main` and the multi-asset branch.

## Baseline implementation

- **Market initialization:** stores an admin, rate parameters, and aggregate-accounting fields.
- **Collateral deposits:** transfers collateral into an SPL token account and updates a user position.
- **Borrowing:** calculates a collateral-based borrow limit and transfers cash tokens from a vault using PDA signing.
- **Repayment:** transfers cash tokens back and reduces recorded debt.
- **Withdrawals:** requires recorded debt to be zero before returning collateral.
- **Liquidation:** contains a debt-threshold check, liquidator repayment, and collateral-transfer logic.
- **Interest accrual:** `main` uses a hard-coded 500-basis-point annual rate in `sync_interest`; it does not yet derive the rate from all stored market parameters.
- **Price handling:** uses a Pyth account parser with a local empty-account fallback. See the limitations below before interpreting prices.

### Program entrypoints on `main`

```text
initialize
initialize_market
deposit_collateral
borrow_cash
repay_cash
withdrawl_collateral
liquidate
```

`withdrawl_collateral` preserves the spelling currently used in the code. Anchor's TypeScript client exposes it as `withdrawlCollateral`.

## Architecture

```text
TypeScript client / local test scenarios
                  |
                  v
         Anchor instruction handlers
           |          |          |
           v          v          v
       Market    UserPosition   Price helper
           \          /
            SPL Token CPIs
                  |
                  v
         Token vaults + PDA signer
```

`Market` stores market-level configuration. `UserPosition` stores ownership, collateral, debt, and the last interest-update timestamp. An `AssetConfig` structure is present on `main`; its registration workflow is introduced on the multi-asset branch.

## Repository layout

```text
.
├── Anchor.toml
├── Cargo.toml
├── rust-toolchain.toml
├── package.json
├── programs/sol_project/
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs
│       ├── state/mod.rs
│       ├── instructions/
│       ├── constants.rs
│       └── error.rs
├── tests/gold_lending_protocol.ts.ts
└── migrations/deploy.ts
```

A complete `frontend/` application is available on the feature branches, not on `main`.

## Local development

### Prerequisites

- Rust: the repository pins **1.89.0** in `rust-toolchain.toml`.
- Anchor CLI **0.32.1**, matching the Rust and TypeScript Anchor dependencies.
- A compatible Solana/Agave CLI and local validator installation.
- Node.js and Yarn. `Anchor.toml` selects Yarn for its test command.
- A disposable localnet keypair. Review the provider wallet path before running tests; the committed default is `~/.config/solana/id.json`.

Exact host-platform and Solana CLI compatibility has not been established by this documentation. Check your toolchain versions if the build reports dependency or SDK incompatibilities.

### Baseline workflow

```bash
git clone --branch main https://github.com/thinkbin006/asset-lending-protocol.git
cd asset-lending-protocol

yarn install
anchor build
```

Check that the local deployment keypair, `declare_id!` in `lib.rs`, and the program address in `Anchor.toml` agree. For a fresh disposable local setup, Anchor provides `anchor keys list` and `anchor keys sync`; syncing changes local program-ID configuration, so review the resulting diff and rebuild afterward.

```bash
anchor test
```

With the configured `localnet` provider, `anchor test` manages its local test-validator workflow. **The current suite is not documented as passing:** review the known blockers below first. It creates example token mints and accounts and exercises lending operations; it is not a security audit.

### UI development

To inspect the UI, start from a feature branch rather than `main`:

```bash
git switch feature/ui-development
cd frontend
npm install
npm run dev
```

Use a Node.js version supported by the declared Next.js 16 release. The development UI is served on `http://localhost:3000` by default, and its mounted connection provider targets `http://127.0.0.1:8899`.

This starts a **UI-development workflow**, not a complete lending demo. The health-factor display uses sample values. Before sending transactions, synchronize the branch's IDL/types and account addresses, complete the account wiring, and verify the selected wallet and RPC network. For hosted previews, browser-facing RPC addresses must not point to the viewer's localhost.

## Known limitations and next steps

1. **Account sizing:** on `main`, `Market::LEN` is 96, while its fixed-width fields require 104 bytes before Anchor's 8-byte discriminator. Correct the allocation before relying on market initialization.
2. **Oracle units and validation:** an empty account returns a mock price of `2000_000000`, while the non-empty Pyth path uses different scaling. Normalize prices consistently with token decimals, validate feed identity and price sign, and replace panic-prone `unwrap()` calls. A mock fallback must not be reachable in a real deployment.
3. **Account relationships:** strengthen and test the relationships between positions, markets, asset configurations, mints, token vaults, and oracle accounts. A PDA signer alone is not proof that all supplied accounts belong to the intended market.
4. **Financial arithmetic:** review liquidation scaling, repayment bounds, rounding, and market-level reconciliation. The presence of checked arithmetic in some expressions does not make every operation safe.
5. **Tests:** isolate borrowing, healthy-position rejection, liquidation after a controlled price change, interest accrual, and repayment. The baseline sequence attempts liquidation without first establishing an unhealthy position; its later assertions should not be treated as verified results.
6. **Feature-branch integration:** deposit-cash and treasury-related source files do not by themselves establish complete callable workflows. The multi-asset branch's deposit UI still has a placeholder mint, incomplete accounts, and IDL-import paths that need alignment. Some components are not mounted on the home page.

A useful next milestone is a deterministic local test suite covering authorization, accounting invariants, price staleness, decimal conversions, and replayable failures. No latency, finality, or throughput benchmark is claimed here.
