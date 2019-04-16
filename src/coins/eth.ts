import { computeAddress } from "ethers/utils";
import {ethers} from "ethers";
import Big from 'big.js';
import axios from "axios";

import {
    transferABI,
    config,
    ethTransactionType,
    sendType,
} from "../constants";
import { 
    getAtomicValue,
    getConfig,
} from "../utils";


export const getWallet = ({childNode}) => {
    const wif = "0x" + childNode.privateKey.toString("hex");
    const publicKey = "0x" + childNode.publicKey.toString("hex");
    const address = computeAddress(wif);          

    return {wif, publicKey, address}
}

export const send = async ({
    rb , from, address, amount, options,
}: sendType): Promise<string> => {
    const { rpc } = getConfig(rb);
    const txCount = await getTxCount(from, rpc);
    const transaction: ethTransactionType = {
        nonce: ethers.utils.hexlify(txCount),
        gasLimit: ethers.utils.hexlify(options.gasLimit),
        gasPrice: ethers.utils.hexlify(options.gasPrice),
        to: address,
        //from,
        value: ethers.utils.hexlify(Number((new Big(amount).times(getAtomicValue(rb))).toString(10))),
    };
    return sendSignedWeb3(options.wif, transaction, rpc);
};

export const sendERC20 = async ({
    rb, from, address, amount, options,
}: sendType): Promise<string>  => {
    const { rpc } = getConfig(rb);
    const asset = config[rb.base].assets[rb.rel];
    const data = getDataFromTransfer(address, amount, asset);
    const txCount = await getTxCount(from, rpc);
    const transaction: ethTransactionType = {
        nonce: ethers.utils.hexlify(txCount),
        gasLimit: ethers.utils.hexlify(options.gasLimit),
        gasPrice: ethers.utils.hexlify(options.gasPrice),
        to: asset.hash,
        data,
        value: ethers.utils.hexlify(0),
    };
    return sendSignedWeb3(options.wif, transaction, rpc);
    
};

export const sendSignedWeb3 = async (wif: string, transaction: ethTransactionType, rpc: string): Promise<string> => {
    const wallet = new ethers.Wallet(wif);
    const signedTransaction: string = await wallet.sign(transaction);
    const txid = await postRPC(rpc, "eth_sendRawTransaction", [signedTransaction]);
    return txid;
};
export const getTxCount = async (address: string, rpc: string): Promise<number> => {
    const count = await postRPC(rpc, "eth_getTransactionCount", [address, "latest"]);
    const txCount = parseInt(count, 16);    
    return txCount;
}
export const postRPC  = async(rpc, method, params) => {
    const res = await axios.post(rpc, {
        "jsonrpc":"2.0",
        "method": method,
        "params":params,
        "id":1
    });
    return res.data.result;
}

export const getDataFromTransfer = (address, amount, asset) => {
    const abi = new ethers.utils.Interface(transferABI)
    const value = ethers.utils.parseUnits(amount.toString(), asset.decimals);
    const data = abi.functions.transfer.encode([address, value]);
    return data;
}