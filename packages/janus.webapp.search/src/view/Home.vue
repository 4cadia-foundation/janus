<template>
  <div class="container">
    <img class="logo" src="../assets/images/ethereum.png">
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
.container {
  clear: both;
}
</style>
