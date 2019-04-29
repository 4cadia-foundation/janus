<template>
  <div class="container">
    <div class="wrapper">
      <h2>PAGINA DE RESULTADO</h2>
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
  name: 'Search',
  components: {
    'v-item-result': ItemResult
  },
  computed: {
  },
  data () {
    return {
      search: this.$route.query.q ? this.$route.query.q : '',
      filteredData: [],
      msg: ''
    }
  },
  methods: {
    getfilteredData: function () {
      let filteredDataBySearch = []
      console.log(this.search)
      if (this.search !== '') {
        filteredDataBySearch = data.filter(obj => {
          return obj.title.indexOf(this.search) >= 0 || obj.desc.indexOf(this.search) >= 0
        })
        if (this.filteredDataBySearch) {
          this.filteredData = filteredDataBySearch
        } else {
          this.msg = 'Nenhum resultado encontrado'
        }
      } else {
        this.msg = 'Digite algo para ser pesquisado'
      }
    }
  },
  mounted () {
    this.getfilteredData()
  }
}
</script>
