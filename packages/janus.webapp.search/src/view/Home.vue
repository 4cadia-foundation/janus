<template>
  <div class="container">
    <h1>{{msg}}</h1>
    <div class="wrapper">
      <v-form-search />
    </div>
  </div>
</template>

<script>
import FormSearch from '@/components/FormSearch'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Janus Platform'
    }
  },
  components: {
    'v-form-search': FormSearch
  },
  computed: {
  },
  methods: {
  },
  mounted () {
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
