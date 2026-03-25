module.exports = [
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/frontend/target/sol_project.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "address": "DBi9Wids5DqV4QJtRyz3ib3YYNMJZUwCw82Ybh1dhxed",
    "metadata": {
        "name": "sol_project",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "add_asset",
            "discriminator": [
                81,
                53,
                134,
                142,
                243,
                73,
                42,
                179
            ],
            "accounts": [
                {
                    "name": "market",
                    "writable": true
                },
                {
                    "name": "asset_config",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    97,
                                    115,
                                    115,
                                    101,
                                    116,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "market"
                            },
                            {
                                "kind": "arg",
                                "path": "asset_mint"
                            }
                        ]
                    }
                },
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "_asset_mint",
                    "type": "pubkey"
                },
                {
                    "name": "price",
                    "type": "pubkey"
                },
                {
                    "name": "ltv",
                    "type": "u64"
                },
                {
                    "name": "bonus",
                    "type": "u64"
                },
                {
                    "name": "decimals",
                    "type": "u8"
                }
            ]
        },
        {
            "name": "borrow_cash",
            "discriminator": [
                67,
                25,
                221,
                26,
                16,
                151,
                195,
                180
            ],
            "accounts": [
                {
                    "name": "asset_config"
                },
                {
                    "name": "market",
                    "writable": true
                },
                {
                    "name": "vault_authority",
                    "docs": [
                        "Its safety is guaranteed by the seeds and bump constraints."
                    ],
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "market"
                            }
                        ]
                    }
                },
                {
                    "name": "pyth_price_feed"
                },
                {
                    "name": "user_position",
                    "writable": true
                },
                {
                    "name": "vault_cash_account",
                    "writable": true
                },
                {
                    "name": "user_cash_account",
                    "writable": true
                },
                {
                    "name": "owner",
                    "signer": true,
                    "relations": [
                        "user_position"
                    ]
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "deposit_collateral",
            "discriminator": [
                156,
                131,
                142,
                116,
                146,
                247,
                162,
                120
            ],
            "accounts": [
                {
                    "name": "user_position",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "user_token_account",
                    "writable": true
                },
                {
                    "name": "vault_token_account",
                    "writable": true
                },
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "initialize_market",
            "discriminator": [
                35,
                35,
                189,
                193,
                155,
                48,
                170,
                203
            ],
            "accounts": [
                {
                    "name": "market",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    109,
                                    97,
                                    114,
                                    107,
                                    101,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "admin"
                            }
                        ]
                    }
                },
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "base_rate",
                    "type": "u64"
                },
                {
                    "name": "optimal_util",
                    "type": "u64"
                },
                {
                    "name": "optimal_rate",
                    "type": "u64"
                },
                {
                    "name": "max_rate",
                    "type": "u64"
                },
                {
                    "name": "reserve_factor",
                    "type": "u64"
                },
                {
                    "name": "treasury_vault",
                    "type": "pubkey"
                }
            ]
        },
        {
            "name": "liquidate",
            "discriminator": [
                223,
                179,
                226,
                125,
                48,
                46,
                39,
                74
            ],
            "accounts": [
                {
                    "name": "asset_config"
                },
                {
                    "name": "market"
                },
                {
                    "name": "vault_authority",
                    "docs": [
                        "Its safety is guaranteed by the seeds and bump constraints."
                    ],
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "market"
                            }
                        ]
                    }
                },
                {
                    "name": "pyth_price_feed"
                },
                {
                    "name": "user_position",
                    "writable": true
                },
                {
                    "name": "vault_cash_account",
                    "writable": true
                },
                {
                    "name": "vault_gold_account",
                    "writable": true
                },
                {
                    "name": "liquidator_cash_account",
                    "writable": true
                },
                {
                    "name": "liquidator_gold_account",
                    "writable": true
                },
                {
                    "name": "liquidator",
                    "signer": true
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "repay_amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "repay_cash",
            "discriminator": [
                44,
                95,
                5,
                54,
                180,
                203,
                70,
                43
            ],
            "accounts": [
                {
                    "name": "user_position",
                    "writable": true
                },
                {
                    "name": "market"
                },
                {
                    "name": "vault_cash_account",
                    "writable": true
                },
                {
                    "name": "user_cash_account",
                    "writable": true
                },
                {
                    "name": "owner",
                    "signer": true,
                    "relations": [
                        "user_position"
                    ]
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "withdrawl_collateral",
            "discriminator": [
                110,
                96,
                186,
                231,
                23,
                172,
                103,
                97
            ],
            "accounts": [
                {
                    "name": "asset_config"
                },
                {
                    "name": "user_position",
                    "writable": true
                },
                {
                    "name": "market"
                },
                {
                    "name": "vault_token_account",
                    "writable": true
                },
                {
                    "name": "user_token_account",
                    "writable": true
                },
                {
                    "name": "vault_authority",
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "market"
                            }
                        ]
                    }
                },
                {
                    "name": "pyth_price_feed"
                },
                {
                    "name": "owner",
                    "signer": true,
                    "relations": [
                        "user_position"
                    ]
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "AssetConfig",
            "discriminator": [
                57,
                112,
                247,
                166,
                247,
                64,
                140,
                23
            ]
        },
        {
            "name": "Market",
            "discriminator": [
                219,
                190,
                213,
                55,
                0,
                227,
                198,
                154
            ]
        },
        {
            "name": "UserPosition",
            "discriminator": [
                251,
                248,
                209,
                245,
                83,
                234,
                17,
                27
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InsufficientCollateral",
            "msg": "The amount of collateral is too low for this loan."
        },
        {
            "code": 6001,
            "name": "NotLiquidatable",
            "msg": "The account is already healthy and cannot be liquidated."
        },
        {
            "code": 6002,
            "name": "InvalidOraclePrice",
            "msg": "The Oracle price is stale or invalid."
        },
        {
            "code": 6003,
            "name": "MathOverflow",
            "msg": "Math overflow occurred."
        },
        {
            "code": 6004,
            "name": "ActiveDebtRemaining",
            "msg": "Active debt remaining for the account."
        },
        {
            "code": 6005,
            "name": "PositionNotLiquidatable",
            "msg": "No debt to liquidate!"
        },
        {
            "code": 6006,
            "name": "InvalidAsset",
            "msg": "The provided asset config does not match the user's collateral mint."
        },
        {
            "code": 6007,
            "name": "WithdrawalWouldTriggerLiquidation",
            "msg": "Withdrawal would leave the position under-collateralized."
        },
        {
            "code": 6008,
            "name": "GlobalBorrowCapReached",
            "msg": "The global borrow cap for the protocol has been reached."
        }
    ],
    "types": [
        {
            "name": "AssetConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "asset_mint",
                        "type": "pubkey"
                    },
                    {
                        "name": "price_feed",
                        "type": "pubkey"
                    },
                    {
                        "name": "market",
                        "type": "pubkey"
                    },
                    {
                        "name": "ltv",
                        "type": "u64"
                    },
                    {
                        "name": "liquidation_threshold",
                        "type": "u64"
                    },
                    {
                        "name": "liquidation_bonus",
                        "type": "u64"
                    },
                    {
                        "name": "decimals",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "Market",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "admin",
                        "type": "pubkey"
                    },
                    {
                        "name": "treasury_vault",
                        "type": "pubkey"
                    },
                    {
                        "name": "reserve_factor",
                        "type": "u64"
                    },
                    {
                        "name": "accrued_treasury_fees",
                        "type": "u64"
                    },
                    {
                        "name": "total_collateral_gold",
                        "type": "u64"
                    },
                    {
                        "name": "total_borrowed_cash",
                        "type": "u64"
                    },
                    {
                        "name": "max_borrow_cap",
                        "type": "u64"
                    },
                    {
                        "name": "total_deposited",
                        "type": "u64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "base_rate",
                        "type": "u64"
                    },
                    {
                        "name": "optimal_utilization",
                        "type": "u64"
                    },
                    {
                        "name": "optimal_rate",
                        "type": "u64"
                    },
                    {
                        "name": "max_rate",
                        "type": "u64"
                    },
                    {
                        "name": "last_updated_slot",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "UserPosition",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "pubkey"
                    },
                    {
                        "name": "market",
                        "type": "pubkey"
                    },
                    {
                        "name": "collateral_mint",
                        "type": "pubkey"
                    },
                    {
                        "name": "collateral_amount",
                        "type": "u64"
                    },
                    {
                        "name": "borrow_amount",
                        "type": "u64"
                    },
                    {
                        "name": "health_factor",
                        "type": "u64"
                    },
                    {
                        "name": "last_update_ts",
                        "type": "i64"
                    }
                ]
            }
        }
    ],
    "constants": [
        {
            "name": "SEED",
            "type": "string",
            "value": "\"anchor\""
        }
    ]
};
}),
"[project]/frontend/hooks/useWorkspace.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkspace",
    ()=>useWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useAnchorWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@solana/wallet-adapter-react/lib/esm/useAnchorWallet.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@solana/wallet-adapter-react/lib/esm/useConnection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@coral-xyz/anchor/dist/esm/provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@coral-xyz/anchor/dist/esm/program/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$target$2f$sol_project$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/target/sol_project.json.[json].cjs [app-ssr] (ecmascript)"); // Copy your target/idl/sol_project.json here
"use client";
;
;
;
;
const useWorkspace = ()=>{
    const { connection } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useConnection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConnection"])();
    const wallet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2f$lib$2f$esm$2f$useAnchorWallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnchorWallet"])();
    const program = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!wallet) return null;
        // The Provider is the "Authenticated" connection
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnchorProvider"](connection, wallet, {
            preflightCommitment: "processed"
        });
        // This creates the Program object we use to call methods
        return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$program$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Program"](__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$target$2f$sol_project$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], provider);
    }, [
        connection,
        wallet
    ]);
    return {
        program,
        wallet,
        connection
    };
};
}),
"[project]/frontend/components/MarketStats.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarketStats",
    ()=>MarketStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/hooks/useWorkspace.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const MarketStats = ()=>{
    const { program, wallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const [marketData, setMarketData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchMarket = async ()=>{
        if (!program || !wallet) return;
        // 1. Derive the Market PDA (Must match your Rust seeds!)
        const [marketPDA] = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
            Buffer.from("market"),
            wallet.publicKey.toBuffer()
        ], program.programId);
        try {
            const data = await program.account.market.fetch(marketPDA);
            setMarketData(data);
        } catch (e) {
            console.error("Failed to fetch market:", e);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchMarket();
    }, [
        program
    ]);
    if (!marketData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Connect Wallet to see Market Stats..."
    }, void 0, false, {
        fileName: "[project]/frontend/components/MarketStats.tsx",
        lineNumber: 29,
        columnNumber: 27
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 bg-gray-900 text-white rounded-xl border border-blue-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: "Protocol Overview"
            }, void 0, false, {
                fileName: "[project]/frontend/components/MarketStats.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 p-4 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Total Borrowed"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/MarketStats.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-mono",
                                children: [
                                    "$",
                                    (marketData.totalBorrowedCash.toNumber() / 1e6).toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/MarketStats.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/MarketStats.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 p-4 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Reserve Factor"
                            }, void 0, false, {
                                fileName: "[project]/frontend/components/MarketStats.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-mono",
                                children: [
                                    marketData.reserveFactor.toNumber() / 100,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/components/MarketStats.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/components/MarketStats.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/components/MarketStats.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/MarketStats.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/frontend/components/DepositCollateral.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DepositCollateral",
    ()=>DepositCollateral
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/hooks/useWorkspace.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$coral$2d$xyz$2f$anchor$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@coral-xyz/anchor/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/bn.js/lib/bn.js [app-ssr] (ecmascript) <export default as BN>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@solana/web3.js/lib/index.esm.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const DepositCollateral = ()=>{
    const { program, wallet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$hooks$2f$useWorkspace$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleDeposit = async ()=>{
        if (!program || !wallet) return alert("Connect Wallet First!");
        try {
            // 1. Re-derive the PDAs needed for the transaction
            const [marketPDA] = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
                Buffer.from("market"),
                wallet.publicKey.toBuffer()
            ], program.programId);
            // Note: In a real app, you'd fetch the specific asset_mint from a config
            const goldMint = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"]("YOUR_GOLD_MINT_ADDRESS_FROM_TESTS");
            const [assetConfigPDA] = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$web3$2e$js$2f$lib$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PublicKey"].findProgramAddressSync([
                Buffer.from("asset_config"),
                marketPDA.toBuffer(),
                goldMint.toBuffer()
            ], program.programId);
            // 2. Execute the transaction
            const tx = await program.methods.depositCollateral(new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$bn$2e$js$2f$lib$2f$bn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BN$3e$__["BN"](parseFloat(amount) * 1e9)) // Assuming 9 decimals for Gold
            .accounts({
                market: marketPDA,
                assetConfig: assetConfigPDA
            }).rpc();
            console.log("Deposit Success! TX:", tx);
            alert("Deposit Successful!");
        } catch (err) {
            console.error("Deposit failed", err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 bg-gray-800 rounded-lg mt-4 border border-yellow-500/30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-xl font-semibold text-yellow-500 mb-4",
                children: "Deposit Gold"
            }, void 0, false, {
                fileName: "[project]/frontend/components/DepositCollateral.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "number",
                value: amount,
                onChange: (e)=>setAmount(e.target.value),
                placeholder: "Amount in Gold",
                className: "w-full p-2 bg-gray-700 rounded mb-4 text-white outline-none focus:ring-2 focus:ring-yellow-500"
            }, void 0, false, {
                fileName: "[project]/frontend/components/DepositCollateral.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleDeposit,
                className: "w-full py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded transition-colors",
                children: "Confirm Deposit"
            }, void 0, false, {
                fileName: "[project]/frontend/components/DepositCollateral.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/components/DepositCollateral.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/frontend/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@solana/wallet-adapter-react-ui/lib/esm/WalletMultiButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MarketStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/MarketStats.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DepositCollateral$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/components/DepositCollateral.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-black text-white p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex justify-between items-center mb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-extrabold tracking-tighter text-blue-500",
                        children: [
                            "SOL-LEND ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-500 text-sm font-normal",
                                children: "v1.0"
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/page.tsx",
                                lineNumber: 11,
                                columnNumber: 20
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$solana$2f$wallet$2d$adapter$2d$react$2d$ui$2f$lib$2f$esm$2f$WalletMultiButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletMultiButton"], {}, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$MarketStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MarketStats"], {}, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$components$2f$DepositCollateral$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DepositCollateral"], {}, void 0, false, {
                            fileName: "[project]/frontend/app/page.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/app/page.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__04a1ekm._.js.map