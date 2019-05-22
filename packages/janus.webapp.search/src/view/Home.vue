<template>
  <div class="container">
    <router-link to="/">
      <img class="logo" src="../assets/ethereum.png">
    </router-link>
    <h1>{{title}}</h1>
    <div>
      <v-form-search />
      </div>
  </div>
</template>

<script>
import FormSearch from '@/components/FormSearch'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Plataform'
    }
  },
  components: {
    'v-form-search': FormSearch
  }
}
</script>

<style>
</style>
