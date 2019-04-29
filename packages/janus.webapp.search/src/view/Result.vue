<template>
  <div class="container">
    <div class="wrapper">
      <v-form-search />
    </div>
  </div>
</template>

<script>
import FormSearch from '@/components/FormSearch'
export default {
  name: 'Result',
  components: {
    'v-form-search': FormSearch
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
  },
  mounted () {
  }
}
</script>
