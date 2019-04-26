<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form-content row">
      <div class="col">
        <v-input :input="input"/>
        <v-button/>
      </div>
    </div>
  </form>
</template>

<script>
import InputSearch from '@/components/InputSearch'
import ButtonSearch from '@/components/ButtonSearch'
export default {
  name: 'FormSearch',
  data () {
    return {
      input: '',
      filteredData: []
    }
  },
  components: {
    'v-input': InputSearch,
    'v-button': ButtonSearch
  },
  computed: {},
  methods: {
    handleSubmit () {
      console.log(this.input)
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
</style>
