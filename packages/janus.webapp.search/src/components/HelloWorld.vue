<template>
  <div>
    <b-container>
      <h1>{{msg}}</h1>
      <input-search/>
    </b-container>
  </div>
</template>

<script>
import InputSearch from '@/components/input'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Janus Project'
    }
  },
  components: {
    'input-search': InputSearch

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
