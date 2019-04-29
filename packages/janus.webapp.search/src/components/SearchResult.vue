<template>
  <div class="container">
    <div class="wrapper">
      <h2>RESULTADO</h2>
      <div class="result">
        <p>{{msg}}</p>
        <ul class="list list-results">
          <v-item-result v-for="(item, index) in filteredData" :key="index" :item="item"></v-item-result>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ItemResult from '@/components/ItemResult'
import data from '@/utils/data'
export default {
  name: 'SearchResult',
  components: {
    'v-item-result': ItemResult
  },
  computed: {
  },
  data () {
    return {
      search: '',
      filteredData: [],
      filteredDataBySearch: [],
      msg: ''
    }
  },
  methods: {
    getfilteredData: function () {
      if (this.search !== '') {
        this.filteredDataBySearch = data.filter(obj => {
          return obj.title.indexOf(this.search) >= 0 || obj.desc.indexOf(this.search) >= 0
        })
        if (this.filteredDataBySearch.length > 0) {
          this.filteredData = this.filteredDataBySearch
        } else {
          this.msg = 'Nenhum resultado encontrado'
        }
      } else {
        this.msg = 'Digite algo para ser pesquisado'
      }
    }
  },
  mounted () {
    this.$parent.$on('search', (search) => {
      this.search = search
      this.getfilteredData()
    })
  }
}
</script>
