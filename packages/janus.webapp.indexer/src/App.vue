<template>
  <div id="app">
    <v-modal-login ref="loginModal"/>
    <v-header/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>

/* eslint-disable */ 
import Header from '@/components/Header'
import LoginModal from '@/components/LoginModal'

export default {
  name: 'App',

  components: {
    'v-header': Header,
    'v-modal-login': LoginModal
  },
  created(){ 
    // this.$store.dispatch('web3/registerWeb3')
  }
}
</script>

<style>
@import './assets/styles/variables.css';
@import './assets/styles/base.css';
@import './assets/styles/typography.css';
@import './assets/styles/utils.css';
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
