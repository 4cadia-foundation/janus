<template>
  <div class="container" v-bind:class="{ 'submited': this.submited }">
    <img class="logo" src="../assets/images/ethereum.png">
    <h1 class="title">{{title}}</h1>
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
      title: 'Janus Plataform',
      submited: false
    }
  },
  components: {
    'v-form-search': FormSearch,
    'v-search-result': SearchResult
  },
  mounted () {
    this.$root.$on('formSubmit', () => {
      this.submited = true
    })
  }
}
</script>

<style>
.container {
  clear: both;
  margin-top: 60px;
}
.submited {
  margin-top: 0;
}
.submited .logo,
.submited .title {
  display: none;
  transition: all linear .5s;
}
</style>
