import {Keypair} from "stellar-base";
import StellarBase from "stellar-base";
import { sendType,  isTestnet } from "../constants";
import { getConfig } from "../utils";
import axios from "axios";
import qs from "qs";

export const getWallet = ({ childNode }) => {
    const k = Keypair.fromRawEd25519Seed(childNode.privateKey);
    const wif = k.secret();
    const publicKey = k.publicKey()
    const address = publicKey;
    return {wif, publicKey, address};
}
export const send = async ({
    rb , from, address, amount, options,
}: sendType): Promise<string> => {
    
    if(isTestnet){
        StellarBase.Network.useTestNetwork()
    }else{
        StellarBase.Network.usePublicNetwork()
    }
    const { api } = getConfig(rb);
    const res = await axios.get(`${api}/accounts/${from}`);
    var account = new StellarBase.Account(from, res.data.sequence);

    var transaction = new StellarBase.TransactionBuilder(account, {
        fee: StellarBase.BASE_FEE
    })
    .addOperation(StellarBase.Operation.payment({
        destination: address,
        asset: StellarBase.Asset.native(),
        amount: amount.toString(),
    }))
    .setTimeout(300)
    .build()
    
    transaction.sign(Keypair.fromSecret(options.wif))
    const xdr = transaction.toEnvelope().toXDR('base64');
    
    const result = await axios.post(`${api}/transactions`,qs.stringify({
        tx: xdr,
    }),{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }        
    })
    return result.data.hash;
}