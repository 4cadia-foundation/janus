<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-content row">
        <div class="col">
            <input
              type="text"
              class="form-control input-search"
              placeholder="Enter key word  ..."
              v-model="search"
            >
            <v-button/>
        </div>
      </div>
    </form>
    <div class="result">
      <ul class="list list-results">
        <v-item v-for="(item, index) in filteredData" :key="index" :item="item"></v-item>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonSearch from '@/components/ButtonSearch'
import ItemList from '@/components/ItemList'
import data from '@/utils/data'
export default {
  name: 'FormSearch',
  data () {
    return {
      search: '',
      filteredData: []
    }
  },
  components: {
    'v-button': ButtonSearch,
    'v-item': ItemList
  },
  computed: {},
  methods: {
    handleSubmit () {
      this.getfilteredData()
    },
    getfilteredData: function () {
      console.log(this.search)
      this.filteredData = data
      console.log(this.filteredData)
      let filteredDataBySearch = []
      if (this.search !== '') {
        filteredDataBySearch = this.filteredData.filter(obj => obj.title.indexOf(this.search) >= 0)
        this.filteredData = filteredDataBySearch
      }
      console.log(this.filteredData)
    }
  },
  props: {
  },
  mounted () {}
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
