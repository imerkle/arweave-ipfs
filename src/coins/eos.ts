import { Api, JsonRpc } from 'eosjs';
import { config, sendType } from '../constants';

const ecc  = require("eosjs-ecc");
const Wif  = require("wif");
const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;
const getApi = (base, wif) => {
    const privateKeys = [wif];
    const signatureProvider = new JsSignatureProvider(privateKeys);
    const rpc = new JsonRpc(config[base].rpc, { fetch });
    const api = new Api({ rpc, signatureProvider });
    
    return api;
}

export const getWallet = ({childNode}) => {
    const address = ecc.PublicKey(childNode.publicKey).toString()
    const publicKey = address;
    const wif = Wif.encode(128, childNode.privateKey, false)    
    
    return { wif, publicKey, address }
}
export const send = async ({
    rb, from, address, amount, options,
}: sendType): Promise<string> => {
    const precision = 4;
    const api = getApi(rb.base, options.wif)
    const result = await api.transact({
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
                actor: from,
                permission: 'active',
            }],
            data: {
                from,
                to: address,
                quantity: `${amount.toFixed(precision)} ${rb.base}`,
                memo: "",
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    }); 
    return result.transaction_id;
}