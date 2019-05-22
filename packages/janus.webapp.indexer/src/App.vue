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
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

h1 {
  margin: 0.67em 0;
  color: #666666;
  font-weight: 600;
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: #5436D6;
  cursor: pointer;
}

a:active,
a:visited {
  color: #6142ed;
}

#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.logo {
  width: 100px;
}

.btn {
  background-color: transparent;
  border-color: transparent;
}

.wrapper {
  max-width: 50%;
  position: relative;
  margin: auto;
}

.errors {
  text-align: left;
  padding: 0 0 0 5px;
  margin-top: 10px;
  font-size: .875rem;
  color: #dc3545;
  list-style: none;
}
</style>
