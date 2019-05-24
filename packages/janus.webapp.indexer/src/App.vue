<template>
  <div id="app">
    <v-header/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',

  components: {
    'v-header': Header
  }
}
</script>

<style>
@import './assets/styles/variables.css';
@import './assets/styles/base.css';
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
