<template>
  <div id="app">
    <v-modal-login ref="loginModal" />
    <v-header />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import LoginModal from '@/components/LoginModal'
import { Indexer } from '@4cadia/janus-indexer-core'
import LocalStorage from './utils/localStorage'

export default {
  name: 'App',

  components: {
    'v-header': Header,
    'v-modal-login': LoginModal
  },
  created () {
    // this.$store.dispatch('web3/registerWeb3')
    let configs = Indexer.GetDefaultConfigs()

    if (!LocalStorage.existsItem('contractAddress')) { LocalStorage.setItem('contractAddress', configs.contractAddress) }

    if (!LocalStorage.existsItem('contractAbi')) {
      LocalStorage.setItem(
        'contractAbi',
        JSON.stringify(configs.contractAbi, null, 2)
      )
    }

    if (!LocalStorage.existsItem('ipfsHost')) { LocalStorage.setItem('ipfsHost', configs.ipfsHost) }
  }
}
</script>

<style>
@import "./assets/styles/variables.css";
@import "./assets/styles/base.css";
@import "./assets/styles/typography.css";
@import "./assets/styles/utils.css";
#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
