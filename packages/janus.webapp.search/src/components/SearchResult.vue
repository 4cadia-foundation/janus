<template>
  <div class="result">
    <v-loader v-bind:class="{ 'visible': this.loading }" />
    <div v-if="hasExceptions" class="result_errors">
      <ul class="errors_list">
        <li class="error" v-for="(exception, index) in this.exceptions" :key="index">{{ exception }}</li>
      </ul>
    </div>
    <div class="result_content" v-else>
      <p class="result_header">We found {{ searchResults.websites.length }} results from this search</p>
      <ul class="list list--results">
        <v-item-result v-for="(item, index) in searchResults.websites" :key="index" :item="item"></v-item-result>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ItemResult from '@/components/ItemResult'
import Loader from '@/components/Loader'

export default {
  name: 'SearchResult',
  components: {
    'v-item-result': ItemResult,
    'v-loader': Loader
  },
  computed: {
    ...mapState({
      searchResults: state => state.search.result,
      searchValue: state => state.search.value
    }),
    ...mapGetters('search', ['getSearchValue']),
    ...mapGetters('validation', ['getExceptionByType']),
    ...mapActions('search', ['getSearchResults']),
    resultIsEmpty: function () {
      if (this.searchResults) {
        return this.searchResults.websites.length === 0
      }
    },
    hasExceptions: function () {
      return this.exceptions.length > 0
    },
    hasEmptyReturn: function () {
      return this.getExceptionByType('EmptyReturn')
    }
  },
  data () {
    return {
      exceptions: [],
      loading: false,
      results: null
    }
  },
  methods: {
    validate: function (e) {
      this.exceptions = []
      if (this.resultIsEmpty) {
        console.warn('[SearchResults] Search return is empty')
        let exception = this.hasEmptyReturn.replace('{ keyword }', this.searchValue)
        this.exceptions.push(exception)
      }
    },
    getResults: function () {
      this.loading = true
      this.$store.dispatch('search/getSearchResults').then(() => {
        console.log('[SearchResults] Action dispatched')
        this.validate()
        this.loading = false
        console.log(this)
      })
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.result {
  position: relative;
}
.result_content {
  max-width: 80%;
  margin: auto;
}
.result_errors {
  margin: 0 30px 30px;
}
.result_header {
  margin: 0 auto 20px;
  text-align: left;
}
.error {
  color: rgb(63, 61, 75);
  font-size: 20px;
  line-height: 1.5;
}
</style>
