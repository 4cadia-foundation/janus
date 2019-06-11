<template>
  <div class="container container--indexer">
    <h1>{{title}}</h1>
    <div class="wrapper">
      <v-form-upload/>
    </div>
  </div>
</template>

<script>
import FormUpload from '@/components/FormUpload'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Indexer'
    }
  },
  components: {
    'v-form-upload': FormUpload
  }
}
</script>

<style scoped>
.container--indexer {
  background: none;
  color: white;
  margin-top: 4vw;
}
.container--indexer h1 {
  color: white;
}
</style>
