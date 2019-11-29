# arweave-ipfs [![Test Status](https://github.com/imerkle/arweave-ipfs/workflows/CI/badge.svg)](https://github.com/imerkle/arweave-ipfs/actions)

> A simple, lightweight library to "permapin" IPFS files into Arweave blockchain.

This library is written closely to the official ipfs js library and provides easy integration with existing ipfs apps to permapin their data in arweave.

## IPFS+Arweave Hackathon

This project is part of IPFS+Arweave Hackathon:-

This project contains three repos:
 - [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) - Cross-Compatible (js client & node server) library to easily integrate IPFS+Arweave in your apps.
 - [arweave-ipfs-server](https://github.com/imerkle/arweave-ipfs-server) - Centralized server for running IPFS-Arweave service
 - [arweave-ipfs-explorer](https://github.com/imerkle/arweave-ipfs-explorer) - Interactive GUI to get and post ipfs hashes


If you just want to see it in action:

[Server-Less](https://arweave.net/5ljkBHQs2m4JLag-U51YEdG45rvhmO_NYENl7t8umrY) 
> Requires a wallet doesn't depends on any central service

[Server-Backed](https://arweave.net/-L0hP1RghjcaN6LAsy3s-YlbtjEJYUOvos11lb4X1Tg) 
> Does not requires any wallet, automatically pins ipfs hashes not existing in arweave even if you're just viewing them.


It also displays/downloads the content you have uploaded , just add `#/your-ipfs-hash` at end of url


[QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y on Server-Less](https://arweave.net/5ljkBHQs2m4JLag-U51YEdG45rvhmO_NYENl7t8umrY#QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y)
[Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a on Server-Less](https://arweave.net/5ljkBHQs2m4JLag-U51YEdG45rvhmO_NYENl7t8umrY#Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a)

[QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y on Server-Backed](https://arweave.net/-L0hP1RghjcaN6LAsy3s-YlbtjEJYUOvos11lb4X1Tg#QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y)
[Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a on Server-Backed](https://arweave.net/-L0hP1RghjcaN6LAsy3s-YlbtjEJYUOvos11lb4X1Tg#Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a)


## Features 

- Checks for duplicate hashes before pinning 
- Supports multiple hashes in one request 
- Native library with no dependency on centralized servers 
- Highly customizable options
- Cross Compatibility with both client and server side js

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
const result = await ar.add(["Qmy...", "Qmx.."], jwk);
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
const results = await ar.get(["1U5...", "Qmx..."]);

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

For more details see [documentation](https://arweave.net/quKGogRQdoygnckHV0vj_oTfIIRjnn-fETBfQT9kWX4) or generate locally using `typedoc --out docs src` in project root.

# Arweave-IPFS Server

If you want to provide a centralized service where users would be able to upload ipfs hashes into permaweb without requiring arweave keyfile then take a look at [arweave-ipfs-server](https://github.com/imerkle/arweave-ipfs-server)

# Arweave-IPFS Explorer

[arweave-ipfs-explorer](https://github.com/imerkle/arweave-ipfs-explorer) is an easy to use permaweb dapp that uses [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) and[arweave-ipfs-server](https://github.com/imerkle/arweave-ipfs-server) to display and store ipfs hashes into blockchain.
