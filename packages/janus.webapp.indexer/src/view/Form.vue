<template>
  <div class="container">
    <router-link to="/">
      <img class="logo" src="../assets/ethereum.png">
    </router-link>
    <h1>{{title}}</h1>
    <div class="wrapper">
      <v-form class="content"/>
    </div>
  </div>
</template>

<script>
import BaseForm from '@/components/BaseForm'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Indexer'
    }
  },
  components: {
    'v-form': BaseForm
  }
}
</script>

<style scoped>
</style>
