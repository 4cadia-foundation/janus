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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      title: 'teste'
    }
  },
  components: {
    'v-form-search': FormSearch
  },
  computed: {
    ...mapState({
      // messages: state => state.validation.messages
    }),
    ...mapGetters([
      // Mounts the "safelyStoredNumber" getter to the scope of your component.
      'messages'
    ])
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style scoped>
</style>
