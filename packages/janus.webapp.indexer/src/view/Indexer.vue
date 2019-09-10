<template>
  <div class="container container--indexer">
    <div class="row row--full">
      <v-hero
        :hero="hero"
        float="right"
        classes="colapsed"
      ></v-hero>
    </div>
    <v-form-upload/>
  </div>
</template>

<script>
import FormUpload from '@/components/FormUpload'
import Hero from '@/components/Hero'

export default {
  name: 'Home',
  data () {
    return {
      hero: {
        title: 'Indexer'
      }
    }
  },
  components: {
    'v-form-upload': FormUpload,
    'v-hero': Hero
  }
}
</script>

<style scoped>
.container--indexer {
  background: none;
  color: white;
}
.container--indexer h1 {
  color: white;
}
</style>
