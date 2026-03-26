/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sol_project.json`.
 */
export type SolProject = {
  "address": "DBi9Wids5DqV4QJtRyz3ib3YYNMJZUwCw82Ybh1dhxed",
  "metadata": {
    "name": "solProject",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addAsset",
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
          "name": "assetConfig",
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
                "path": "assetMint"
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "assetMint",
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
      "name": "borrowCash",
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
          "name": "assetConfig"
        },
        {
          "name": "market",
          "writable": true
        },
        {
          "name": "vaultAuthority",
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
          "name": "pythPriceFeed"
        },
        {
          "name": "userPosition",
          "writable": true
        },
        {
          "name": "vaultCashAccount",
          "writable": true
        },
        {
          "name": "userCashAccount",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "userPosition"
          ]
        },
        {
          "name": "tokenProgram",
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
      "name": "depositCollateral",
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
          "name": "userPosition",
          "writable": true,
          "signer": true
        },
        {
          "name": "market",
          "writable": true
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
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
      "name": "initializeMarket",
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
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "baseRate",
          "type": "u64"
        },
        {
          "name": "optimalUtil",
          "type": "u64"
        },
        {
          "name": "optimalRate",
          "type": "u64"
        },
        {
          "name": "maxRate",
          "type": "u64"
        },
        {
          "name": "reserveFactor",
          "type": "u64"
        },
        {
          "name": "treasuryVault",
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
          "name": "assetConfig"
        },
        {
          "name": "market"
        },
        {
          "name": "vaultAuthority",
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
          "name": "pythPriceFeed"
        },
        {
          "name": "userPosition",
          "writable": true
        },
        {
          "name": "vaultCashAccount",
          "writable": true
        },
        {
          "name": "vaultGoldAccount",
          "writable": true
        },
        {
          "name": "liquidatorCashAccount",
          "writable": true
        },
        {
          "name": "liquidatorGoldAccount",
          "writable": true
        },
        {
          "name": "liquidator",
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "repayAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "repayCash",
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
          "name": "userPosition",
          "writable": true
        },
        {
          "name": "market"
        },
        {
          "name": "vaultCashAccount",
          "writable": true
        },
        {
          "name": "userCashAccount",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "userPosition"
          ]
        },
        {
          "name": "tokenProgram",
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
      "name": "withdrawlCollateral",
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
          "name": "assetConfig"
        },
        {
          "name": "userPosition",
          "writable": true
        },
        {
          "name": "market"
        },
        {
          "name": "vaultTokenAccount",
          "writable": true
        },
        {
          "name": "userTokenAccount",
          "writable": true
        },
        {
          "name": "vaultAuthority",
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
          "name": "pythPriceFeed"
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "userPosition"
          ]
        },
        {
          "name": "tokenProgram",
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
      "name": "assetConfig",
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
      "name": "market",
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
      "name": "userPosition",
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
      "name": "customError",
      "msg": "Custom error message"
    }
  ],
  "types": [
    {
      "name": "assetConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetMint",
            "type": "pubkey"
          },
          {
            "name": "priceFeed",
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
            "name": "liquidationThreshold",
            "type": "u64"
          },
          {
            "name": "liquidationBonus",
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
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "treasuryVault",
            "type": "pubkey"
          },
          {
            "name": "reserveFactor",
            "type": "u64"
          },
          {
            "name": "accruedTreasuryFees",
            "type": "u64"
          },
          {
            "name": "totalCollateralGold",
            "type": "u64"
          },
          {
            "name": "totalBorrowedCash",
            "type": "u64"
          },
          {
            "name": "maxBorrowCap",
            "type": "u64"
          },
          {
            "name": "totalDeposited",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "baseRate",
            "type": "u64"
          },
          {
            "name": "optimalUtilization",
            "type": "u64"
          },
          {
            "name": "optimalRate",
            "type": "u64"
          },
          {
            "name": "maxRate",
            "type": "u64"
          },
          {
            "name": "lastUpdatedSlot",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userPosition",
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
            "name": "collateralMint",
            "type": "pubkey"
          },
          {
            "name": "collateralAmount",
            "type": "u64"
          },
          {
            "name": "borrowAmount",
            "type": "u64"
          },
          {
            "name": "healthFactor",
            "type": "u64"
          },
          {
            "name": "lastUpdateTs",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "seed",
      "type": "string",
      "value": "\"anchor\""
    }
  ]
};
