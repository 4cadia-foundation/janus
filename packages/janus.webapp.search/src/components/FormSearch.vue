<template>
  <div class="wrapper">
    <form
      @submit="handleSubmit"
      class="form">
      <div class="form-content col">
        <div class="form-field row">
            <input
              type="text"
              class="form-control input-search"
              v-model="searchValue"
              :placeholder="placeholder"
            >
            <v-button/>
        </div>
        <div class="form-errors row">
          <p v-if="getErrors">
            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
              <li v-for="(error, index) in getErrors" :key="index">{{ error }}</li>
            </ul>
          </p>
        </div>
      </div>
    </form>
    <v-search-result />
  </div>
</template>
<script>

import ButtonSearch from '@/components/ButtonSearch'
import SearchResult from '@/components/SearchResult'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'FormSearch',
  components: {
    'v-button': ButtonSearch,
    'v-search-result': SearchResult
  },
  data () {
    return {
      placeholder: 'Search something on Janus...',
      searchValue: ''
    }
  },
  computed: {
    ...mapState({
      searchState: state => state.form.search,
      messages: state => state.validation.messages
    }),
    // Mounts the "getSearch" getter to the scope of your component.
    ...mapGetters('validation', [
      'getErrors',
      'errorMatchesHttp'
    ])
  },
  methods: {
    handleSubmit: function (e) {
      this.$store.commit('form/updateForm', this.searchValue)
    }
  },
  mounted () {
    console.log(this.errorMatchesHttp('general'))
  }
}
</script>

<style scoped>
.col {
  max-width: 50%;
  position: relative;
  margin: auto;
}
.input-search {
  border: none;
  border-radius: 16px;
}
.form-control {
  padding-top: 0px;
  padding-left: 16px;
  color: rgb(63, 61, 75);
  background-color: rgb(255, 255, 255);
  height: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  font-size: 1rem;
  font-family: "Source Sans Pro", -apple-system, sans-serif;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: rgb(204, 204, 204);
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
}
</style>
