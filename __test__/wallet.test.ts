
import { generateSeed, generatePKey } from "../src";
//import { expect } from 'chai';

const mnemonic = "connect ritual news sand rapid scale behind swamp damp brief explain ankle";
const seed_hex = "27a718f64d256afa9d95a1d561f059f8a2488c87b2ff56eaeee1ff8dac465804a54400f70205ee698c1b3e2cad4c5b8117f892878dea6d585c6db7e42ab3dda1";
const wallets = [
    
{
    name: "Bitcoin",
    rel: "BTC",
    base: "BTC",
    address: "1JN2GamM8pXmJvSRKxiRBppf9Zgur6Ze7L",
    //address: "3JMkSuohT4aUVdj9PGtG7D15afRjHcPBcQ",
    public_key: "03bc140f5f9970ea9b2888f808b117e25949fcf4825ca14929ba12b7a310c6b351",
    wif: "KwxFiVzM64x3SEgyYnzCDf8xh3s3Ber66GeD23HkdGrsdKvhGAnf",
},
{
    name: "Litecoin",
    rel: "LTC",
    base: "BTC",
    address: "LfPqHoYgghwxjJt2BrjrqwPjhRwk69VFZx",
    public_key: "030b64436288da08229024009879b5085b1b26a69543a416bde661e329fec73158",
    wif: "T9ZxCWN8guvnX2UYkGLx3nWGC4xym1fH6cRMWDXY9mVETyoFx6xP",
},
{
    name: "Dash",
    rel: "DASH",
    base: "BTC",
    address: "XyQ5Dc9abDeRpiihst9JY1M5fhTv4nKJL5",
    public_key: "03a6a92e3cf75be1f5409977acc8ff537d1cdead3e22dcf234e858dc9346c7ba1c",
    wif: "XJh35xpP39mjGjN6UBpx58MhWWA8KVZktBzbtrrcjKVzxxYMKUie",
},
{
    name: "Ethereum",
    rel: "ETH",
    base: "ETH",
    address: "0xb023b80afad0363ab966cf10b5f76E5f625Cf497",
    public_key: "0x03979f591ae21a27a518479b3a58afbf99b8807a77e4e7b1233d95300a1c19b3f2",
    wif: "0x68d473d56faa29c81138d2830aa6cfe8323feb35da3e311929fb29eea25fb8dc",
},
{
    name: "Vechain",
    rel: "VET",
    base: "VET",
    address: "0x684e90C1e5aB7449988D3180C34A99f92A54b705",
    public_key: "0x029f3e29b4fb71f2e732dfdac1d17cf75893136164973bf5edee6753f4065bf284",
    wif: "0x39188da8d0f5e30082d295abc589b5c7c31ddb65781b317947f15dfae53bbb9e",
},
{
    name: "Ripple",
    rel: "XRP",
    base: "XRP",
    address: "rPphbLGemSQv4De1LUHYq6tupBkrrZUxNe",
    public_key: "031f5b18658ba210dca0fe2669b2dd51b9ad12964efbcfa4a56774e4375e968263",
    wif: "f8b9412446e9328262cc158f03472b6450c3cf19b9db5c3975c15a84f3189123",
},
{
    name: "Neo",
    rel: "NEO",
    base: "NEO",
    address: "AShDKgLSuCjGZr8Fs5SRLSYvmcSV7S4zwX",
    public_key: "03f7f87c8988579de62bd416958e8c27da8e7948a2639c1027eb37e386f10badcf",
    wif: "KwmYnVNazav2fWiFjTaU4SdK9bVsg1J1FQcaAkqYVa196XifCrp2",
},
{
    name: "EOS",
    rel: "EOS",
    base: "EOS",
    address: "EOS5ZXHpkLdY9qqYLEL5D5VPwZop9BrF6pCMT4QauJJzkrA7xitfA",
    public_key: "EOS5ZXHpkLdY9qqYLEL5D5VPwZop9BrF6pCMT4QauJJzkrA7xitfA",
    wif: "5K7V5He9abzwEavLTEVeWj4U9xEtVdnrGD4jc5piNvmbAz45mcS",
}
];

describe("Mnemonic Preparation", () => {
    it("Seed Generation", async() => {
        const { seed, mnemonic:  _m } = await generateSeed(mnemonic, "");        
        expect(seed.toString("hex")).toEqual(seed_hex);
        expect(_m).toEqual(mnemonic);
    });    
});
describe("Wallet Address Generation", () => {
    wallets.map((o) => {
        it(o.name, async() => {
            const { seed, mnemonic: _m } = await generateSeed(mnemonic, "");
            const k = generatePKey({ rel: o.rel, base: o.base }, seed);
            expect(k.wif).toEqual(o.wif);
            expect(k.address).toEqual(o.address);
            expect(k.publicKey).toEqual(o.public_key);
        });
    });
});