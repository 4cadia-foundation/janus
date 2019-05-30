<template>
  <div :class="'highlight float--' + float">
    <div class="content content--text">
      <h1 class="title" v-html="highlight.title"></h1>
      <div class="text" v-html="highlight.text"></div>
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
  background: var(--color-navy);
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
}
.highlight img {
  position: absolute;
  right: 5%;
  top: 0;
  height: 90%;
}
.highlight .content--text {
  width: 50%;
  vertical-align: middle;
  margin-left: 30px;
  color: white;
}
.content--text .title {
  font-size: 2em;
  color: white;
}
.content--text .text {
  font-size: 1.3em;
}
</style>
