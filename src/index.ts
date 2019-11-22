// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { ApiConfig } from 'arweave/web/lib/api'
var tou8 = require('buffer-to-uint8array')

const IpfsHttpClientLite = require('ipfs-http-client-lite')
const Arweave = require('arweave/node')
const isIPFS = require('is-ipfs')

const IPFS_KEY = 'IPFS-Add-Test'

type HashWithIds = { [key: string]: string }
type Uint8A = any

export default class ArweaveIpfs {
  arweave: any
  ipfs: any
  constructor(
    ipfs_opts: any = { host: 'ipfs.infura.io', port: 5001, protocol: 'https' },
    arweave_opts: ApiConfig = { host: 'arweave.net', port: 443, protocol: 'https' }
  ) {
    this.arweave = Arweave.init(arweave_opts)
    this.ipfs = IpfsHttpClientLite(`${ipfs_opts.protocol}://${ipfs_opts.host}:${ipfs_opts.port}`)
  }
  add = async (
    hashes: Array<string> | string | Array<object>,
    jwk: any,
    skipArFetch = false
  ): Promise<HashWithIds> => {
    if (typeof hashes == 'string') {
      hashes = [hashes]
    }
    let refinedHashes: Array<string>
    if (typeof hashes[0] != 'string') {
      //@ts-ignore
      refinedHashes = hashes.map(o => o.path)
    } else {
      //@ts-ignore
      refinedHashes = hashes
    }
    let arIds: Array<string> = Array(hashes.length).fill(null)
    if (!skipArFetch) {
      arIds = await this.getArIdFromHashes(refinedHashes)
    }
    let x = await Promise.all(
      refinedHashes.map(async (o, i) => {
        if (arIds[i] == null) {
          return await this.addHash(o, jwk)
        } else {
          return makeHashWithIds(o, arIds[i])
        }
      })
    )
    return Object.assign({}, ...x)
  }
  get = async (hashes: Array<string> | string, jwk: any = null): Promise<Uint8A> => {
    if (typeof hashes == 'string') {
      hashes = [hashes]
    }
    let ids = await this.getArIdFromHashes(hashes)
    let hashToPushToAr: Array<String> = []
    let x = Promise.all(
      ids.map(async (o, i) => {
        if (o != null) {
          let tx = await this.arweave.transactions.get(o)
          return tx.get('data', { decode: true })
        } else {
          hashToPushToAr.push(hashes[i])
          const data: Buffer = await this.ipfs.cat(hashes[i])
          return tou8(data)
        }
      })
    )
    if (jwk && hashToPushToAr.length > 0) {
      let y = await this.add(hashToPushToAr, jwk, true)
    }
    return x
  }
  getArIdFromHashes = async (hashes: Array<string>): Promise<Array<string>> => {
    return Promise.all(
      hashes.map(async o => {
        if (isIPFS.multihash(o)) {
          let x = await this.arweave.arql({
            op: 'equals',
            expr1: IPFS_KEY,
            expr2: o
          })
          if (x.length > 0) {
            return x[0]
          } else {
            return null
          }
        } else {
          return o
        }
      })
    )
  }
  addHash = async (h: string, jwk: any): Promise<HashWithIds> => {
    const data: Buffer = await this.ipfs.cat(h)
    let transaction = await this.arweave.createTransaction({ data: tou8(data) }, jwk)
    transaction.addTag(IPFS_KEY, h)

    //fast blocks hack
    const anchor_id = (await this.arweave.api.get('/tx_anchor')).data
    transaction.last_tx = anchor_id

    await this.arweave.transactions.sign(transaction, jwk)
    await this.arweave.transactions.post(transaction)
    return makeHashWithIds(h, transaction.id)
  }
}
const makeHashWithIds = (hash: string, id: string): HashWithIds => {
  return { [hash]: id }
}
