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
      title: 'Janus Search',
      submited: false
    }
  },
  components: {
    'v-form-search': FormSearch,
    'v-search-result': SearchResult
  },
  methods: {
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
  margin-top: 100px;
}
.submited {
  margin-top: 0;
}
.submited .logo,
.submited .title {
  display: none;
  transition: all linear .5s;
}

/* Media Mobile */
@media (max-width: 768px) {
  .container {
    margin-top: 50px;
  }
  .container.submited {
    margin-top: 0;
  }
  .title {
    font-size: 1.4em;
  }
}
</style>
