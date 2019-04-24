<template>
  <div>
    <b-container>
      <h1>{{msg}}</h1>
      <input-search/>
    </b-container>
  </div>
</template>

<script>
import InputSearch from '@/components/input'
import { default as Web3 } from 'web3'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Janus Project'
    }
  },
  components: {
    'input-search': InputSearch
  },
  mounted () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    let web3 = window.web3
    if (typeof web3 !== 'undefined') {
      console.warn('Using web3 detected from external source.')
      // Use Mist/MetaMask's provider
      // web3 = new Web3(web3.currentProvider)
      web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
      web3.eth.getAccounts(console.log)
    } else {
      console.warn('No web3 detected.')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
