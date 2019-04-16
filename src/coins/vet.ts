import {
    ClauseType,
    sendType,
    config,
    explorer_api,
    RB,
} from "../constants";
import {
    getAtomicValue,
    getConfig,
} from "../utils";
import axios from "axios";

import {
    cry,
    Transaction,
} from "thor-devkit";
import { getDataFromTransfer } from "./eth";
export {getWallet} from "./eth"
import Big from "big.js";

export const send = async ({
    rb, address, amount, options,
}: sendType): Promise<string> => {
    const { chainTag } = getConfig(rb);
    const clauses =  [{
        to: address,
        value: (new Big(amount).times(getAtomicValue(rb))).toString(10),
        data: "0x",
    }];
    return sendTransaction(rb, chainTag, clauses, options.wif);
};
export const sendERC20 = async ({
    rb, address, amount, options,
}: sendType): Promise<string> => {
    const { chainTag } = getConfig(rb);

    const asset = config[rb.base].assets[rb.rel];
    const data = getDataFromTransfer(address, amount, asset);

    const clauses: ClauseType[] =  [{
        to: asset.hash,
        value: (0).toString(),
        data,
    }];
    return sendTransaction(rb, chainTag, clauses, options.wif, 65000);
};

const sendTransaction = async (rb: RB, chainTag: number, clauses: ClauseType[], wif: string, gasLimit?: number): Promise<string> => {
    const data = await axios.get(`${explorer_api}/best_block_vet?ticker=${rb.base}`);
    const blockRef = data.data.id.slice(0, 18); // first 16 bytes of best block id in hex

    const gas = gasLimit || Transaction.intrinsicGas(clauses);
    const gasPriceCoef = 128;
    const expiration = 720;
    const body = {
        chainTag,
        blockRef,
        expiration,
        clauses,
        gasPriceCoef,
        gas,
        dependsOn: null,
        nonce: Number(new Date()),
    };
    const tx = new Transaction(body);
    const signingHash = cry.blake2b256(tx.encode());
    const privateKey = new Buffer(wif.substr(2), "hex");
    tx.signature = cry.secp256k1.sign(signingHash, privateKey);

    const raw = tx.encode();
    const res = await axios.post(`${explorer_api}/post_tx_vet`, { ticker: rb.base, rawTx: "0x" + raw.toString("hex")});
    return res.data.id;
};
