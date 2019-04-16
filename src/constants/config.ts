const a = {
    BTC: {
        explorer: "https://blocktrail.com/BTC",
        api: "https://insight.bitpay.com/api",
        code: 0,
        decimals: 10 ** 8,
        forks: ["LTC", "DASH"],
        fee_label: "Sats",
        // "estimateFee": true,
        base: true,
        name: "Bitcoin",
        network: {
            name: "Bitcoin",
            per1: 1e8,
            unit: "BTC",
            messagePrefix: "\x18Bitcoin Signed Message:\n",
            hashGenesisBlock: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
            // nDefaultPort
            port: 8333,
            portRpc: 8332,
            protocol: {
                // pchMessageStart
                magic: 0xd9b4bef9, // careful, sent over wire as little endian
            },
            // vSeeds
            seedsDns: [
                "seed.bitcoin.sipa.be",
                "dnsseed.bluematt.me",
                "dnsseed.bitcoin.dashjr.org",
                "seed.bitcoinstats.com",
                "bitseed.xf2.org",
                "seed.bitcoin.jonasschnelli.ch",
            ],
            // base58Prefixes
            versions: {
                bip32: {
                    private: 0x0488ade4,
                    public: 0x0488b21e,
                },
                bip44: 0,
                private: 0x80,
                public: 0x00,
                scripthash: 0x05,
            },
        },
    },
    LTC: {
        explorer: "https://insight.litecore.io",
        api: "https://insight.litecore.com/api",
        code: 2,
        decimals: 10 ** 8,
        fee_label: "LTC",
        name: "Litecoin",
        ofBase: "BTC",
        forks: [],
        network: {
            name: "Litecoin",
            unit: "LTC",
            hashGenesisBlock: "12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
            port: 9333,
            protocol: {
                magic: 0xdbb6c0fb,
            },
            seedsDns: [
                "dnsseed.litecointools.com",
                "dnsseed.litecoinpool.org",
                "dnsseed.ltc.xurious.com",
                "dnsseed.koin-project.com",
                "dnsseed.weminemnc.com",
            ],
            versions: {
                bip32: {
                    private: 0x019d9cfe,
                    public: 0x019da462,
                },
                bip44: 2,
                private: 0xb0,
                public: 0x30,
                scripthash: 0x32,
                scripthash2: 0x05, // old '3' prefix. available for backward compatibility.
            },
        },
    },
    DASH: {
        explorer: "https://insight.dash.org",
        api: "https://insight.dash.org/api",
        code: 5,
        decimals: 10 ** 8,
        fee_label: "DASH",
        name: "Dash",
        ofBase: "BTC",
        forks: [],
        network: {
            name: "Dash",
            unit: "DASH",
            hashGenesisBlock: "00000ffd590b1485b3caadc19b22e6379c733355108f107a430458cdf3407ab6",
            // nDefaultPort
            port: 9999,
            portRpc: 9998,
            protocol: {
                magic: 0xbd6b0cbf, // careful, sent over wire as little endian
            },
            // vSeeds
            seedsDns: [
                "dash.org",
                "dnsseed.dash.org",
                "dashdot.io",
                "dnsseed.dashdot.io",
                "masternode.io",
                "dnsseed.masternode.io",
                "dashpay.io",
                "dnsseed.dashpay.io",
            ],
            // base58Prefixes
            versions: {
                bip32: {
                    private: 0x0488ade4,
                    public: 0x0488b21e,
                },
                bip44: 5,
                private: 0xcc,
                public: 0x4c,
                scripthash: 0x10,
            },
        },
    },
    ETH: {
        explorer: "https://etherscan.io",
        api: "https://api.etherscan.io/api",
        api_tokens: "https://tokenbalance.herokuapp.com/api/balance",
        rpc: "https://mainnet.infura.io/v3/2294f3b338ad4524aa9186012810e412",
        assets: require("./assets/eth.json"),
        code: 60,
        decimals: 10 ** 18,
        fee_label: "gwei",
        // "estimateFee": true,
        dualFee: true,
        base: true,
        name: "Ethereum",
        forks: [],
    },
    NEO: {
        explorer: "https://neoscan.io",
        api: "https://api.neoscan.io/api/main_net/v1",
        code: 888,
        assets: require("./assets/neo.json"),
        decimals: 10 ** 0,
        fee_label: "GAS",
        base: true,
        name: "Neo",
        forks: [],
    },
    /*
    NANO: {
        explorer: "https://www.nanode.co",
        api: "http://35.227.18.245:7076/",
        code: 165,
        decimals: 10 ** 30,
        fee_label: "",
        noFee: true,
        base: true,
        name: "Nano",
        forks: [],
        rep: "xrb_17krztbeyz1ubtkgqp9h1bewu1tz8sgnpoiii8q7c9n7gyf9jfmuxcydgufi",
    },
    */
    VET: {
        explorer: "https://veforge.com",
        api: "https://veforge.com/api",
        assets: require("./assets/vet.json"),
        code: 818,
        decimals: 10 ** 18,
        fee_label: "VTHO",
        base: true,
        noFee: true,
        name: "Vechain",
        forks: [],
        energy_ticker: "VTHO",
        chainTag: 74, // 0x4a
    },
    XRP: {
        explorer: "https://xrpcharts.ripple.com/#/transactions",
        api: "https://xrpnode.herokuapp.com/api",
        rpc: "http://s1.ripple.com:51234",
        code: 144,
        decimals: 10 ** 6,
        fee_label: "XRP",
        base: true,
        name: "Ripple",
        forks: [],
        node: "main",
        noFee: true,
    },
    EOS: {
        explorer: "https://xrpcharts.ripple.com/#/transactions",
        api: "https://xrpnode.herokuapp.com/api",
        rpc: "https://s.altnet.rippletest.net:51234",
        code: 194,
        decimals: 10 ** 6,
        fee_label: "RAM",
        base: true,
        name: "EOS",
        forks: [],
        noFee: true,
    },    
    /*
    "XMR": {
        "explorer": {
            "main": "https://www.nanode.co/",
            "test": "https://www.nanode.co/"
        },estimateFee
        "api": {
            "main": "http://35.227.18.245:7076/",
            "test": "http://35.227.18.245:7076/"
        },
        "code": 128,
        "decimals": 10 ** 18,
    },    */
};

export default a;