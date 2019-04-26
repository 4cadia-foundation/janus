<template>
  <div class="container-fluid">
    <div class="search-wrapper">
      <form v-on:submit="getfilteredData">
        <div class="form-row">
          <div class="col-10">
            <input type="text" class="form-control" placeholder="Enter key word  ..." v-model="search" v-on:keyup="getfilteredData">
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </form>
      <div id="checkboxes">
        <div v-for="(stack,index) in stacks" :key="index" class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox"  v-model="stack.checked" v-on:change="getfilteredData">
          <label class="form-check-label">
            {{ stack.value }}
          </label>
        </div>
      </div>
    </div>
    <div class="card-columns">
      <item-card v-for="(item, index) in filteredData" :key="index" :item="item"></item-card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/card'
import data from '@/utils/data'
export default {
  name: 'Result',
  components: {
    'item-card': Card
  },
  computed: {
    selectedFilters: function () {
      let filters = []
      let checkedFiters = this.stacks.filter(obj => obj.checked)
      checkedFiters.forEach(element => {
        filters.push(element.value)
      })
      return filters
    }
  },
  data () {
    return {
      filteredData: [],
      search: '',
      stacks: [
        {
          checked: false,
          value: 'language'
        },
        {
          checked: false,
          value: 'framework'
        },
        {
          checked: false,
          value: 'frontend'
        },
        {
          checked: false,
          value: 'backend'
        },
        {
          checked: false,
          value: 'mobile'
        },
        {
          checked: false,
          value: 'web'
        },
        {
          checked: false,
          value: 'hybrid'
        },
        {
          checked: false,
          value: 'database'
        }
      ]
    }
  },
  methods: {
    getfilteredData: function () {
      this.filteredData = data
      let filteredDataByfilters = []
      let filteredDataBySearch = []
      if (this.selectedFilters.length > 0) {
        filteredDataByfilters = this.filteredData.filter(obj => this.selectedFilters.every(val => obj.stack.indexOf(val) >= 0))
        this.filteredData = filteredDataByfilters
      }
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
