import ArweaveIpfs from '../src'

var jwk = {
  kty: 'RSA',
  e: 'AQAB',
  n:
    'xt95m_2XPEkIudFxiSUFujKs-kkIwFDvjqEGHbHVPZO8f9aA9CYBU_BqPiVTJ5-dDQ3Fs98NzaddbH4xHLZ-8wBtPHQTSuXIB562nE60iV_667BCT50WX2_YscMKBYmzOltYXv4wi3Fq4ML9nOwtDGf7ZDTWnd1ND-EM-e4AYpg2CLyDRrWznib9Q44gd7B3bKtRyqq9AoVRsQSqREcWwV4tHBLy1YnHzBfQYf_woimSbLV_kPtf0DWKHIoAOganmT6NJoHbHXoXDU3xzQ1UAwyVGuhjMof4ZEZ7Wmb42WR7wDh1kXVKxJjhcAX1UWQ5NP3f8shxD45G7ei-uW-RpSCt-yjRf1Ai9k8KFxhe9UOszuIuorzQS0R2SDcsxE7-kxPnjuZ8XR7DX8us4wtJXbevDwKcrdzwk86nuo589FUxjVmKoN7l2-tg8UolEPf9MADoCUjUMcK9-KKuE0YYaoo4eQ6dBvUtO5LNbn-O9Y2GeE2tz9Lkr3hFHM8wqD9BnJsy1rqwMEVXqOWfBJUcdM9hLug4k_2BHZawIVe0C84rZIlWvsYrd17aH31dN9ciruQ8zYEVCxP-Mke-v_vbnAddD_Kl_qgM5D6J9AVm8ZBcKTaJjd1XqhCYO2EgV033W0nDYxOZxq9H7aJKJwNXqrrGeffjLKnhthjsXns3d60',
  d:
    'M8pA1jG9L9LpNdLoWUnN6waFa4yXfdXV_PPMLvF_0dBmd3g6DtrS37QtRs_bjucPNDYQ9V2yL4tVVgqq6YpRFyFWUTb9SzT52Zoofh40_82B_9zf9_G1wNbUvL5JHtYUWa8uHVbe94FqzuuYtkP_G0r8-cSU23mlNuxpv7COYx62e6H0Ifbxts76h5w8sk6_Wwpme3vpSv3DH3FSkgNdVrAa2UPJ_3gpEupktxC67tAatLqzZONBuWwn8nSxyGqxPMRAZ_XLRSrlU-6neLnu1fhx4BcCtkcYlayRNSK5zYtQeud5Ho9IEFir5Mt4bmDGURmIN6ahYuavbAd_m7UFXV_sWoCYmDA7hqvgCsVu21J12oLCkE-a73vugCSyaFznmKQgh-nPrECHc4q2LVS2lM6WIcJ9pERrissQPi8Hv5c3nCkJPHF2_gCoNENa4KdzXANRggfzVOh_nPD-vg57zG8UkPm3Dfh0a2wH2VRb0B4KR81dBgM_2gq4ITCjltdahlUsgGmouiXtN4rZDMsJcTIm50YFKWaB-wj_f0Ez95_91aKyHXaOvy78TDWs5hVsh943U1eTlDDgqfm9MMw4u5rUCTNBcfFHEZDeXEa0BKHKpYzAuUu7sfJE59hosd6gsC_GaWB6e3vqtIJ-78_v9tVVHvpbLdt8bTiF1iJ4k9U',
  p:
    '_6De8IVCtJSBqqyJxduvP6u4YMj6jLFufiG9mUPQvUFOm4HbJLOXJR3pC_mJWtyDVmBXJo_rilYsIX4J7UELr4DZmfpKNofKZepPaHlWRbNMyKypjojbBNN518GNtRRtobrUlhH1AQ1fvI_9fA6P9teI_9Qo9LTLtMgy0gP4aG847o2sZ7tatRBGuIg_GlQyJA2-qtb9MnXY7EwOLY3t_B5by84ntBFIWiNken-Zi2nxpduog22ymKnXf4aehY9LdgWOWd1n5NjazKgO-dLPvhlOajPUK70xmHFKzCtJefGZzAl2tyNfl-fbtnLiGAfXGMm52MQje6IAdqSZkOVbiw',
  q:
    'xyl7uUs4UgCPUg0k15xbT3rqfLN5ckP8PwDMBxCMvdqkyZ48R3fGIxwnzYyuMvvlv1OaWIbBXJxd4zTNEK7P7aA2OJcr0rCqMZEjVeqboIs0UBqIyj-gTY90mUeVjYIAb1aRQITVwIyyzlDrsXN1vti58MO_IiNFRKXZfiU1tl8570qWmsIEo0sBoxUv04Rab1NbaATTFPjLoh47gNve2jQwYGtLFkyOewY2BjGqUhowHX9JGLq2t9NUT6oD85UrwALkeHMSltlWBPDNX-69hWnZSs7sGdYk6-g1k2d3tNCR1IFunssXc649-O3PJLQ8-KQsLBvOxt3bFsRoKuJApw',
  dp:
    'pUXZXiCKlD4_551OJkJ29--Kcej_NN-y1JH0B5e06efDbv9yNDR40GKaPkfD6p8Pu1Tmg-QhIXu9ZJocyOx5JatlBQyx1rfMwD_Rv3ZTtRTL3CLmLWWGVYR1Dm3xtNXUW_BzaeOKSHfhIgTmmsK_iZSo2t7M7AnIesXFNcujW8ItSO8IPLkBWHeBgeV1BwzQrkbEs6f0ZB-VdJFnyUQuTgdCym4rdVyHLuAbIqhFGcIRnm56cR8HjXSiA62B6FBRNak59BgWB_u82vz9UcBe2EV8UWXZE75qxmjZN0_1XYY7LZQg0R9puskJYNi-HVNUWo5yPhfx6QlAy3R4ZRolKQ',
  dq:
    'Cg2B_Txav2jf0xhuv6NYyI4_v8OfYbEkzllP8xtWv06F-tdN252kFqmZKLrtIA2u7xVdORK0N-R8qLdFko4AWNI5amnXAG-CZ7YXvoJ1EIl2PoTYWr0TblbLX-FJHzdspjIMauFJmMqBTACxpOdbDiMKX6jBwQtet7RXYhKmv2nXFskBCRa5_TQQBRdQrrCDkBL5DisQLILSZIB6KGrwuLrhpjxEMf_zQSpzF6TyH-rKevKt0d2601SLcOn4AReKecqrlZjZW1vlB6LP-wOl9VH-cdQ3_qXcfzvdWG9kj2_nrH5MAx_lMyWcYzA9wHCIk1RWFnPg4BDaui93wpJhCQ',
  qi:
    'OQjDOrRFM_4U1Mtm_dfjwOaYl0VeHD-5KxnYx8xKfF245RrcD5CJDiZtue39kTpg4jLXPv6UBxiOulEX_Rm4-DvTFfk8QVWM_xS0k6BvwavTzYXPBtCFn2ZOUs2QtOni11OAxnD8yEN2Ir699HyqtxL370_oK3Nvp4VEvTWk9-pONOgHVuJeRjG2qDEeez-6SwZkoD-BYFkG8NCBlgeskJBax1HpKuRilKG8ZIzWmg4MSc24tX-19BgaXnNmnxwVoev4Y0W6b2rJ6zYUEj5vchQ2jdoIJsNwe8l1q38UF-eRbuLSZISaGPN7mpm3JouRO1GjzxXCiU8TrAu0NGmCEw'
}

describe('IPFS test', () => {
  it('Basic Tests', async () => {

    let ar = new ArweaveIpfs()
    expect(await ar.add([{
      path: "",
      hash: "Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a",
    }], jwk)).toEqual({
      Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a: '1U5kug5cr6j7vBt71FJYNLDFmqliUMm_1BCG6fjLSW8'
    })

    expect(await ar.add('Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a', jwk)).toEqual({
      Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a: '1U5kug5cr6j7vBt71FJYNLDFmqliUMm_1BCG6fjLSW8'
    })

    expect(
      await ar.getArIdFromHashes([
        'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2b',
        'Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
      ])
    ).toEqual([null, '1U5kug5cr6j7vBt71FJYNLDFmqliUMm_1BCG6fjLSW8'])


    let u8_ar = (await ar.get('QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y', jwk))["QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y"];
    let u8_ar2 = (await ar.get('Fyguyp8lnuRo1iH_1joDyAEtLdnhQf1733b4mBxGKsM', jwk))["Fyguyp8lnuRo1iH_1joDyAEtLdnhQf1733b4mBxGKsM"];


    expect(u8_ar).toEqual(u8_ar2)
    expect(u8_ar[0]).toEqual(137)
    expect(u8_ar[3]).toEqual(71)
    expect(u8_ar[5]).toEqual(10)

    let invalid = (await ar.get(['asd']))['asd'];
    expect(invalid).toEqual([])
  }, 30000)
})
