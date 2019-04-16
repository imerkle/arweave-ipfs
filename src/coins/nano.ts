import {
    sendType,
    pendingSendType,
} from "../constants";
import {
  getAtomicValue,
  getConfig,
} from "../utils";
import axios from "axios";
import * as nanocurrency from "nanocurrency";

const BN = require("big.js");

export const getWallet = ({childNode}) => {

  const wif = nanocurrency.deriveSecretKey(childNode, 0);
  const publicKey = nanocurrency.derivePublicKey(wif);
  const address = nanocurrency.deriveAddress(publicKey);  
  
  return {wif, publicKey, address};
}
export const send = async ({ rb, from, address, amount, options }: sendType): Promise<string> => {
    const { api, rep } = getConfig(rb);
  const d4 = await axios.post(`${api}`, {
      action: "account_representative",
      account: from,
  });

  const d3 = await axios.post(`${api}`, {
      action: "accounts_frontiers",
      accounts: [from],
  });

  const representative = d4.data.representative || rep;
  const frontier = d3.data.frontiers[from];
  const previous = frontier || "0000000000000000000000000000000000000000000000000000000000000000";
  const link = address;
  const w1 = await axios.post(`${api}`, {
      action: "work_generate",
      hash: frontier || options.publicKey,
  });
  const bal = new BN(options.balance.balance_raw).minus(new BN(amount).mul(getAtomicValue(rb)));

  const unsigned_block = {
      link,
      previous,
      work: w1.data.work,
      balance: bal.toString(10),
      representative,
  };
  // @ts-ignore
  const { hash, block } = nanocurrency.createBlock(options.wif, unsigned_block);
  const r1 = await axios.post(`${api}`, {
      action: "process",
      block: JSON.stringify(block),
  });
  return hash;
};

export const pendingSyncNano = async ({ rb, config, balance, pending, address, options }: pendingSendType): Promise<void> => {

    const { api, rep } = getConfig(rb);
    if (parseFloat(pending) > 0) {
        const d1 = await axios.post(`${api}`, {
            action: "accounts_pending",
            accounts: [address],
            source: "true",
        });
        const d4 = await axios.post(`${api}`, {
            action: "account_representative",
            account: address,
        });

        const d3 = await axios.post(`${api}`, {
            action: "accounts_frontiers",
            accounts: [address],
        });

        const representative = d4.data.representative || rep;
        const frontier = d3.data.frontiers[address];

        for (const x1 of Object.keys(d1.data.blocks[address])) {
            const o = d1.data.blocks[address][x1];
            const previous = frontier || "0000000000000000000000000000000000000000000000000000000000000000";
            const link = x1;
            const w1 = await axios.post(`${api}`, {
                action: "work_generate",
                hash: frontier || options.publicKey,
            });

            const bal = new BN(balance).plus(o.amount);

            const unsigned_block = {
                link,
                previous,
                work: w1.data.work,
                balance: bal.toString(10),
                representative,
            };
            // @ts-ignore
            const { hash, block } = nanocurrency.createBlock(options.wif, unsigned_block);
            // @ts-ignore
            const r1 = await axios.post(`${api}`, {
                action: "process",
                block: JSON.stringify(block),
            });
        }
    }
};
/*!
 * nanocurrency-js: A toolkit for the Nano cryptocurrency.
 * Copyright (c) 2018 Marvin ROGER <dev at marvinroger dot fr>
 * Licensed under GPL-3.0 (https://git.io/vAZsK)
 */
// import BigNumber from 'bignumber.js';

// import { checkNumber, checkString } from './check';

// tslint:disable-next-line variable-name
// const TunedBigNumber = BigNumber.clone({ EXPONENTIAL_AT: 1e9 });
const TunedBigNumber = BN;

const ZEROES: { [index: string]: number | undefined } = {
  hex: 0,
  raw: 0,
  nano: 24,
  knano: 27,
  Nano: 30,
  NANO: 30,
  KNano: 33,
  MNano: 36,
};

/** Nano unit. */
export enum Unit {
  /** 10^0 raw in hexadecimal format */
  hex = "hex",
  /** 10^0 raw */
  raw = "raw",
  /** 10^24 raw */
  nano = "nano",
  /** 10^27 raw */
  knano = "knano",
  /** 10^30 raw */
  Nano = "Nano",
  /** 10^30 raw */
  NANO = "NANO",
  /** 10^33 raw */
  KNano = "KNano",
  /** 10^36 raw */
  MNano = "MNano",
}
/** Convert parameters. */
export interface ConvertParams {
  /** The unit to convert the value from */
  from: Unit;
  /** The unit to convert the value to */
  to: Unit;
}

/**
 * Convert a value from one Nano unit to another.
 *
 * @param value - The value to convert
 * @param params - Params
 * @returns Converted number
 */
export const convert = (value: string, params: ConvertParams): string => {
  const paramsNotValid = new Error("From or to is not valid");
  if (!params) { throw paramsNotValid; }

  const fromZeroes: number | undefined = ZEROES[params.from];
  const toZeroes: number | undefined = ZEROES[params.to];

  if (typeof fromZeroes === "undefined" || typeof toZeroes === "undefined") {
    throw new Error("From or to is not valid");
  }

  /*
  const valueNotValid = new Error('Value is not valid');
  if (!checkString) throw valueNotValid;
  if (params.from === 'hex') {
    if (!/^[0-9a-fA-F]{32}$/.test(value)) throw valueNotValid;
  } else {
    if (!checkNumber(value)) throw valueNotValid;
  }
  */

  const difference = fromZeroes - toZeroes;

  let bigNumber;
  if (params.from === "hex") {
    bigNumber = new TunedBigNumber("0x" + value);
  } else {
    bigNumber = new TunedBigNumber(value);
  }

  if (difference < 0) {
    for (let i = 0; i < -difference; i++) {
      bigNumber = bigNumber.dividedBy(10);
    }
  } else if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      bigNumber = bigNumber.multipliedBy(10);
    }
  }

  if (params.to === "hex") {
    return bigNumber.toString(16).padStart(32, "0");
  }

  return bigNumber.toString();
}
