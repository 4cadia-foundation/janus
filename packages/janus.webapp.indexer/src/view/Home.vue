<template>
  <div class="container">
    <router-link to="/">
      <img class="logo" src="../assets/ethereum.png">
    </router-link>
    <h1>{{title}}</h1>
    <div class="wrapper">
      <v-form-upload class="content"/>
    </div>
  </div>
</template>

<script>
import FormUpload from '@/components/FormUpload'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Indexer'
    }
  },
  components: {
    'v-form-upload': FormUpload
  }
}
</script>

<style scoped>
</style>
