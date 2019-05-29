<template>
  <div :class="'highlight float--' + float">
    <div class="content content--text">
      <h2 class="title">{{ highlight.title || capitalize }}</h2>
      <p class="text">{{ highlight.text }}</p>
    </div>
    <div class="content content--image">
      <img :src="highlight.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Highlight',
  data () {
    return {}
  },
  filters: {
    capitalize: item => {
      return item.toUpperCase()
    }
  },
  props: {
    highlight: {
      type: Object
    },
    float: {
      type: String
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.highlight {
  
}
</style>
