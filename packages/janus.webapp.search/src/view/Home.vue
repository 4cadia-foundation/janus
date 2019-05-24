<template>
  <div class="container">
    <router-link to="/">
      <img class="logo" src="../assets/ethereum.png">
    </router-link>
    <h1>{{title}}</h1>
    <div>
      <v-form-search ref="formSearch" />
      <v-search-result ref="searchResult"/>
    </div>
  </div>
</template>

<script>
import FormSearch from '@/components/FormSearch'
import SearchResult from '@/components/SearchResult'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Plataform'
    }
  },
  components: {
    'v-form-search': FormSearch,
    'v-search-result': SearchResult
  }
}
</script>

<style>
</style>
