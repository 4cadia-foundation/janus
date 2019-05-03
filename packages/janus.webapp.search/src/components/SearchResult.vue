<template>
  <div class="container">
    <div class="wrapper">
      <div class="message">
        <v-not-found v-if="error" :message="error.message"/>
        <div v-else>
          <h3>{{error.message}}</h3>
        </div>
      </div>
      <div class="result">
        <ul class="list list-results">
          <v-item-result v-for="(item, index) in filteredDataBySearch" :key="index" :item="item"></v-item-result>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ItemResult from '@/components/ItemResult'
import NotFound from '@/components/NotFound'
import EtherData from '@/utils/ether_data'
export default {
  name: 'SearchResult',
  components: {
    'v-item-result': ItemResult,
    'v-not-found': NotFound
  },
  computed: {
  },
  data () {
    return {
      search: '',
      filteredDataBySearch: [],
      error: []
    }
  },
  methods: {
    getSearchResult: function () {
      let data = EtherData['Search']
      if (this.search !== '') {
        this.filteredDataBySearch = data.filter(obj => {
          return obj.Title.indexOf(this.search) >= 0 || obj.Description.indexOf(this.search) >= 0
        })
        if (this.filteredDataBySearch.length < 0) {
          this.error.push(
            { 'message': 'Message' }
          )
        }
      } else {
        this.filteredDataBySearch = []
      }
    },
    validate: function (e) {
      e.preventDefault()
      this.errors = []
    }
  },
  mounted () {
    this.$parent.$on('search', (search) => {
      this.search = search || ''
      // this.getSearchResult()
      // console.log(Message)
    })
  }
}
</script>
<style scoped>
  .list-results{
    padding: 0%;
  }
</style>
