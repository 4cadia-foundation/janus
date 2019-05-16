<template>
  <div class="result">
    <div v-if="hasExceptions" class="errors">
      <ul class="errors-list">
        <li v-for="(exception, index) in this.exceptions" :key="index">{{ exception }}</li>
      </ul>
    </div>
    <div v-else>
      <ul class="list list-results">
        <v-item-result v-for="(item, index) in searchResults.websites" :key="index" :item="item"></v-item-result>
      </ul>
    </div>
  </div>
</template>

<script>
import ItemResult from '@/components/ItemResult'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'SearchResult',
  components: {
    'v-item-result': ItemResult
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
      return this.getExceptionByType('Empty Return')
    }
  },
  data () {
    return {
      exceptions: []
    }
  },
  methods: {
    validate: function (e) {
      if (this.resultIsEmpty) {
        console.warn('[SearchResults] Search return is empty')
        this.exceptions.push(this.hasEmptyReturn)
      } else {
        this.exceptions = []
      }
    },
    getResults: function () {
      this.$store.dispatch('search/getSearchResults').then(() => {
        console.log('[SearchResults] Action dispatched')
        this.validate()
      })
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.list-results {
  padding: 0%;
}
</style>
