<template>
  <div class="result">
    <v-loader v-bind:class="{ 'visible': this.loading }" />
    <div v-if="hasExceptions" class="result_messages result_messages--exceptions">
      <ul class="messages_list">
        <li class="message" v-for="(exception, index) in this.exceptions" :key="index">{{ exception }}</li>
      </ul>
    </div>
    <div v-else-if="hasErrors" class="result_messages result_messages--errors">
      <p class="messages_header">We found some errors in your search. See what we found:</p>
      <ul class="messages_list">
        <li class="message" v-for="(error, index) in this.errors" :key="index">{{ error.message }}</li>
      </ul>
    </div>
    <div class="result_content" v-else>
      <div class="result_header">
        <p class="result_counter" v-if="this.hasWebsites">We found {{ this.resultsNumber }} result(s) from this search</p>
      </div>
      <ul class="list list--results">
        <v-item-result v-for="(item, index) in searchResults" :key="index" :item="item" :ipfsUrl="searchIpfs"></v-item-result>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ItemResult from '@/components/ItemResult'
import Loader from '@/components/Loader'

export default {
  name: 'SearchResult',
  components: {
    'v-item-result': ItemResult,
    'v-loader': Loader
  },
  data () {
    return {
      exceptions: [],
      errors: [],
      loading: false,
      resultsNumber: 0
    }
  },
  computed: {
    ...mapState({
      searchResults: state => state.search.result,
      searchValue: state => state.search.value,
      searchErrors: state => state.search.errors,
      searchIpfs: state => state.search.ipfs
    }),
    ...mapGetters('search', ['getSearchValue', 'getSearchResults']),
    ...mapGetters('validation', ['getExceptionByType']),
    hasWebsites: function () {
      if (this.searchResults) {
        return this.searchResults.length > 0
      }
    },
    hasExceptions: function () {
      return this.exceptions.length > 0
    },
    hasErrors: function () {
      return this.errors.length > 0
    },
    hasEmptyReturn: function () {
      return this.getExceptionByType('EmptyReturn')
    }
  },
  methods: {
    reset: function (params) {
      this.loading = false
      this.exceptions = []
      this.errors = []
      this.$store.commit('search/updateSearchResults', [])
    },
    validate: function (e) {
      this.exceptions = []
      this.errors = []
      if (this.searchErrors.length > 0) {
        console.error('[SearchResults] Search return errors', this.searchErrors)
        this.errors = this.searchErrors
      } else if (!this.hasWebsites) {
        console.warn('[SearchResults] Search return is empty')
        let exception = this.hasEmptyReturn.replace('{ keyword }', this.searchValue)
        this.exceptions.push(exception)
      } else {
        this.resultsNumber = this.searchResults.length
      }
    },
    getResults: function () {
      this.loading = true
      this.$store.dispatch('search/getSearchResults').then(() => {
        console.log('[SearchResults] Action dispatched')
        this.validate()
        this.loading = false
      })
    }
  },
  mounted () {
    this.reset()
    this.$root.$on('formSubmit', () => {
      this.getResults()
    })
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
.result_counter {
  margin: 0 auto 20px;
  text-align: left;
}
.result_messages--exceptions .message {
  font-size: 20px;
  color: var(--color-gray);
}
.result_messages--errors {
  text-align: left;
}
.result_messages--errors .messages_list {
  list-style: circle;
}
.result_messages--errors .message {
  color: var(--color-red);
  margin: 10px auto;
}
</style>
