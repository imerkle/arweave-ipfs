export interface RB {
    base: string;
    rel: string;
}
export interface txParamsType {
    rb: RB;
    address: string;
}
export interface BalanceType {
    balance: number;
    pending?: number;
    balance_raw?: number | string;
    pending_raw?: number | string;
}
export interface sendOptionsType {
    wif: string;
    publicKey: string;
    fees?: number;
    config?: any;
    gasLimit?: number;
    gasPrice?: number;
    balance?: BalanceType;
}
export interface sendType {
    rb: RB;
    from: string;
    address: string;
    amount: number;
    options: sendOptionsType;
}
export interface pendingSendType {
    rb: RB,
    config: C,
    balance: string;
    pending: string;
    address: string,
    options: sendOptionsType;
}
export interface ClauseType {
    to: string;
    value: string;
    data: string;
}
export interface IAssetType{
    hash: string;
    ticker: string;
    name: string;
    decimals: number;
}
export interface AssetsType{
    [key: string]: IAssetType;
}
export interface ConfigType{
    explorer: string;
    api: string;
    code: number;
    decimals: number;
    forks: Array<string>;
    fee_label: string;
    name: string;
    base?: boolean;
    network?: any;
    ofBase?: string;
    rpc?: string;
    assets?: AssetsType;
    
    //eth
    api_tokens?: string;
    dualFee?: boolean;    

    //nano
    noFee?: boolean;
    rep?: string;    

    //vet
    energy_ticker?: string;
    chainTag?: number;    

    //xrp
    node?: string;
}
export interface C {
    [key: string]: ConfigType;
}
export interface ethTransactionType {
    nonce: string;
    gasLimit: string;
    gasPrice: string;
    to: string;
    from?: string;
    data?: string;
    value: string;
}