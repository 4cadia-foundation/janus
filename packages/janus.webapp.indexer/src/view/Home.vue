<template>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="wrapper">
      <v-hello
        msg="Welcome to Your Vue.js App"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Plataform'
    }
  },
  components: {
    'v-hello': HelloWorld
  }
}
</script>

<style scoped>
</style>
