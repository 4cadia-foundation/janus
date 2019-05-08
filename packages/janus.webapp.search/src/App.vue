<template>
  <div id="app">
    <icon-account/>
    <img src="./assets/eth1.jpg">
    <div class="main">
      <router-view/>
      </div>
  </div>
</template>

<script>
import IconAccount from '@/components/IconAccount'
export default {
  name: 'App',

  components: {
    'icon-account': IconAccount

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
