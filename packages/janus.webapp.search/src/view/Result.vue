<template>
  <div class="container">
    <div class="wrapper">
      <v-form />
    </div>
    <ul class="list list-results">
      <v-item v-for="(item, index) in filteredData" :key="index" :item="item"></v-item>
    </ul>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList'
import FormSearch from '@/components/FormSearch'
import data from '@/utils/data'
export default {
  name: 'Result',
  components: {
    'v-item': ItemList,
    'v-form': FormSearch
  },
  computed: {
  },
  data () {
    return {
      filteredData: [],
      search: ''
    }
  },
  methods: {
    getfilteredData: function () {
      this.filteredData = data
      let filteredDataBySearch = []
      if (this.search !== '') {
        filteredDataBySearch = this.filteredData.filter(obj => obj.name.indexOf(this.search.toLowerCase()) >= 0)
        this.filteredData = filteredDataBySearch
      }
    }
  },
  mounted () {
    this.getfilteredData()
  }
}
</script>
