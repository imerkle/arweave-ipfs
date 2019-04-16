import {isTestnet, config, RB, ConfigType, IAssetType} from '../constants';
const coininfo = require('coininfo')

export const getNetwork = (ticker: string) => {
    const t = isTestnet ? "-TEST": "";
    const network = coininfo(`${ticker}${t}`).toBitcoinJS()  
    return network;
}
export const bufferToHex = (buffer) => {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}
export const getAtomicValue = (rb: RB): number => {
    return config[rb.rel] ? 10 ** config[rb.rel].decimals : 10 ** config[rb.base].assets[rb.rel].decimals;
};
export const getConfig = (rb: RB): ConfigType | ConfigType & IAssetType =>  {
    return config[rb.rel] ? config[rb.rel] : {
        ...config[rb.base]
        , ...config[rb.base].assets[rb.rel]};
};

export const toBitcoinJS = (o) => {
    return {...o, 
        messagePrefix: "\x18Bitcoin Signed Message:\n", // TODO
        bip32: {
            public: o.versions.bip32.public,
            private: o.versions.bip32.private,
        },
        pubKeyHash: o.versions.public,
        scriptHash: o.versions.scripthash,
        wif: o.versions.private,
        dustThreshold: null};
};
