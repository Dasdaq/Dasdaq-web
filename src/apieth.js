import web3 from './web3'
// import request from 'superagent'

export const sign = async (word) => {
  const msgParams = [
    {
      type: 'string', // Any valid solidity type
      name: 'Message', // Any string label you want
      value: word // The value to sign
    }
  ]
  const address = await getMyAddr()
  const result = await signData(msgParams, address)
  return result
}

export const getMyAddr = async () => {
  if (!window.web3) {
    // throw Error('NO_METAMASK')
    alert("请安装MetaMask")
  }
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      const address = accounts[0]
      if (address) {
        return resolve(address)
      }
      // return reject(err)
      alert("请登录MetaMask")
    })
  })
}


export const signData = async (msgParams, from) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [msgParams, from],
      from: from
    },
    (err, result) => (err ? reject(err) : resolve(result)))
  })
}

// export const uploadToServer = async (signature) => {
//   signature = signature.result
//   return request.put('http://localhost:8000/updateAvatar')
//     .set({ Authorization: `Bearer ${signature}` })
// }
