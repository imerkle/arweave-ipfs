# arweave-ipfs [![Test Status](https://github.com/imerkle/arweave-ipfs/workflows/CI/badge.svg)](https://github.com/imerkle/arweave-ipfs/actions)

> A simple, lightweight library to "permapin" IPFS files into Arweave blockchain.

This library is written closely to the official ipfs js library and provides easy integration with existing ipfs apps to permapin their data in arweave.


## Install

```
$ yarn install https://github.com/imerkle/arweave-ipfs.git
```


## Initialisation

```js
import ArweaveIpfs from 'arweave-ipfs';

const ar = new ArweaveIpfs();

// Or specify your own options
const ar = new ArweaveIpfs({
    //ipfs opts
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https' 
},{
  //arweave opts
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

```
## Example

This example shows integration with existing ipfs apps.
The snippet is taken from [ipfs/interface-js-ipfs-core](https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add)

```js
const files = [
  {
    path: '/tmp/myfile.txt',
    content:  Ipfs.Buffer.from('ABC')
  }
]
const results = await ipfs.add(files)

// just add this single line to permapin to arweave
const arweave_result = await ar.add(results);
```
## Usage

##### add

`add` takes ipfs hashes, stores the raw bytes of files and returns the respective arweave txid. It also does additional checks to ensure same data is not stored multiple times.

###### Note: `jwk` is the json of arweave wallet keyfile see [arweave docs](https://github.com/ArweaveTeam/arweave-js#create-a-new-wallet-and-private-key) for more info

```js
const results = await ar.add("Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a", jwk);
```
The `results` array:
```
[
    {
        "Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a": "1U5kug5cr6j7vBt71FJYNLDFmqliUMm_1BCG6fjLSW8"
    }
]
```

`add` also accepts array of hashes
```
const result = await ar.add(["Qmy...", "Qmx.."]);
```

#### get

`get` takes ipfs hashes or valid `IPFS-Add` arweave tx ids and returns data as raw bytes.
It first looks for data in arweave blockchain if not found it fetches it from ipfs node.
###### If the ipfs data is not found in arweave blockchain it automagically permapins the data in arweave blockchain provided the jwk is given. 

```js
const results = await ar.get("Qmx...");
// or
const results = await ar.get(["Qmx...", "Qmy..."]);
// it also accepts arweave tx ids
const results = await ar.get(["1U5..."]);

```

The `results` array:
```
[
    {
        "Qmx...": [1,2,3,4,5,6,7...],
        "Qmy...": [8,9,10,11,12,13...]
    }
]
```

`get` also accepts a second parameter `jwk` which is an arweave key. when `jwk` is supplied any ipfs hash not found in arweave is stored in the blockchain.

```js
// you get the data and the hash is stored in arweave next time someone tries to fetch it
const result = await ar.get("Qm...notinarweavehash", jwk)
```

For more details see [documentation](https://arweave.net/9YaMnKhESn4MUNJcQwNSPG2Xp8Myj4_abxJ9tA3gODw) or generate locally using `typedoc --out docs src` in project root.

# Arweave-IPFS Server

If you want to provide a centralized service where users would be able to upload ipfs hashes into permaweb without requiring arweave keyfile then take a look at [arweave-ipfs-server](https://github.com/imerkle/arweave-ipfs-server)