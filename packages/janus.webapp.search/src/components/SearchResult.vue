<template>
  <div class="result">
    <ul class="list list-results">
      <v-item-result v-for="(item, index) in searchResult" :key="index" :item="item"></v-item-result>
    </ul>
  </div>
</template>

<script>
import ItemResult from '@/components/ItemResult'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SearchResult',
  components: {
    'v-item-result': ItemResult
  },
  computed: {
    ...mapState({
      searchResult: state => state.search.result,
      searchValue: state => state.search.value
    }),
    // Mounts the "getSearch" getter to the scope of your component.
    ...mapGetters('validation', ['getExceptionByType']),
    resultIsEmpty: function (value) {
      return this.searchResult === []
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
    getSearchResult: function () {
      console.log(this.searchValue)
    },
    validate: function (e) {
      if (this.isEmpty(this.searchResult)) {
        this.exceptions.push(this.resultIsEmpty)
      }
    }
  },
  mounted () {
    this.getSearchResult()
    this.$store.watch(
      (state, getters) => getters.getSearchValue,
      (newValue, oldValue) => {
        console.log(this.searchValue)
        console.log(`Updating from ${oldValue} to ${newValue}`)

        // Do whatever makes sense now
        if (newValue === 'success') {
          this.complex = {
            deep: 'some deep object'
          }
        }
      }
    )
  }
}
</script>
<style scoped>
.list-results {
  padding: 0%;
}
</style>
