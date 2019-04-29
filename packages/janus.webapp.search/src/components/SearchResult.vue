<template>
  <div class="container">
    <div class="wrapper">
      <div class="message">
        <v-not-found v-if="error" :message="msg"/>
        <div v-else>
          <h3>{{msg}}</h3>
        </div>
      </div>
      <div class="result">
        <ul class="list list-results">
          <v-item-result v-for="(item, index) in filteredData" :key="index" :item="item"></v-item-result>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ItemResult from '@/components/ItemResult'
import EtherData from '@/utils/ether_data'
import NotFound from '@/components/NotFound'
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
      filteredData: [],
      filteredDataBySearch: [],
      msg: '',
      error: false
    }
  },
  methods: {
    getfilteredData: function () {
      let data = EtherData['Search']
      if (this.search !== '') {
        this.filteredDataBySearch = data.filter(obj => {
          return obj.Title.indexOf(this.search) >= 0 || obj.Description.indexOf(this.search) >= 0
        })
        if (this.filteredDataBySearch.length > 0) {
          this.filteredData = this.filteredDataBySearch
          this.msg = ''
          this.error = false
        } else {
          this.msg = 'Nenhum resultado encontrado'
          this.error = true
          this.filteredData = []
        }
      } else {
        this.msg = 'Digite algo para ser pesquisado'
        this.filteredData = []
      }
    }
  },
  mounted () {
    this.$parent.$on('search', (search) => {
      this.search = search || ''
      this.getfilteredData()
    })
  }
}
</script>
<style scoped>
  .list-results{
    padding: 0%;
  }
</style>
