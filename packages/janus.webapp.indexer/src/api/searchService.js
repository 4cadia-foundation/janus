/**
 * Mocking client-server processing
 */
import EtherData from '@/utils/ether_data'

export default {
  getContractData (cb) {
    setTimeout(() => cb(EtherData), 100)
  },
  getWeb3Connection () {
    // let web3 = window.web3
    // if (typeof web3 !== 'undefined') {
    //   console.warn('Using web3 detected from external source.')
    //   web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
    //   web3.eth.getAccounts(console.log)
    // } else {
    //   console.warn('No web3 detected.')
    // }
  }
}
