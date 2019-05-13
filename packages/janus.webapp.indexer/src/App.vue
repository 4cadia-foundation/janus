<template>
  <div id="app">
    <v-header/>
    <img src="./assets/eth1.jpg">
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
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

h1 {
  margin: 0.67em 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrapper {
  max-width: 50%;
  position: relative;
  margin: auto;
}
</style>
