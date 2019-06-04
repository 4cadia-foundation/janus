<template>
  <div class="paragraph">
    <h2 class="subtitle" v-html="paragraph.title"></h2>
    <div class="content">
      <div class="text" v-html="paragraph.text"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paragraph',
  data () {
    return {}
  },
  props: {
    paragraph: {
      type: Object
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.paragraph {
  position: relative;
  width: 80%;
  margin: auto;
  align-items: center;
}
.text{
  text-align: left;
}
.content {
  font-size: 1.5vw;
}
</style>
