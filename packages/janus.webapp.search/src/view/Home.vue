<template>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="wrapper">
      <v-form-search />
    </div>
  </div>
</template>

<script>
import FormSearch from '@/components/FormSearch'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Plataform'
    }
  },
  components: {
    'v-form-search': FormSearch
  }
}
</script>

<style scoped>
</style>
