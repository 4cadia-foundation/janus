import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  var web3js = window.ethereum
  if (typeof web3js !== 'undefined') {
    var web3 = new Web3(web3js)
    web3.isConnected() ? console.log('[Web3] Conected') : console.log('[Web3] Error in Web3connection')
    try {
      web3js.enable()
    } catch (err) {
      console.error('Error: ', err)
    }
    resolve({
      injectedWeb3: web3.isConnected(),
      web3 () {
        return web3
      }
    })
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'))
  }
}).then((result) => {
  return new Promise(function (resolve, reject) {
    result.web3().eth.getAccounts((err, accounts) => {
      if (err) {
        reject(new Error('Unable to retrieve accounts'))
      } else {
        result = Object.assign({}, result, { accounts })
        resolve(result)
      }
    })
  })
}).catch(e => {
  console.log('error in action registerWeb3', e)
})

export default getWeb3
