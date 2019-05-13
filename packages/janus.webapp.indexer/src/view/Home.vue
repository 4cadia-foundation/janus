<template>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="wrapper">
      <v-hello
        msg="Welcome to Your Vue.js App"
      />
    </div>
    <v-upload/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import FormUpload from '@/components/FormUpload'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Plataform'
    }
  },
  components: {
    'v-hello': HelloWorld,
    'v-upload': FormUpload
  }
}
</script>

<style scoped>
</style>
