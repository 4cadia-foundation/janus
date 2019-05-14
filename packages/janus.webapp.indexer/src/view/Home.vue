<template>
  <div class="container">
    <!-- <h1>{{title}}</h1> -->
    <div class="wrapper">
      <v-upload/>
    </div>
  </div>
</template>

<script>
import FormUpload from '@/components/FormUpload'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Janus Upload Files'
    }
  },
  components: {
    'v-upload': FormUpload
  }
}
</script>

<style scoped>
</style>
