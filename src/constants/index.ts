export * from './interfaces';

export const isTestnet = process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test' ? false : true;
export const config = isTestnet ? require(`./config_test`).default : require(`./config`).default;
export const transferABI = ["function transfer(address to, uint amount)"];
export const explorer_api = isTestnet ? "https://blockchainbalancetest.herokuapp.com" : "https://blockchainbalance.herokuapp.com";