<template>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="wrapper">
      <v-form-search />
      <v-search-result />
      <v-about-button/>
    </div>
  </div>
</template>

<script>
import FormSearch from '@/components/FormSearch'
import SearchResult from '@/components/SearchResult'
import AboutButton from '@/components/AboutButton'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Plataform'
    }
  },
  components: {
    'v-form-search': FormSearch,
    'v-search-result': SearchResult,
    'v-about-button': AboutButton
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 50%;
  position: relative;
  margin: auto;
}
</style>
