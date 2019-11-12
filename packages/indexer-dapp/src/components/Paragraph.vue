<template>
  <div class="paragraph">
    <h2 class="title" v-if="paragraph.title" v-html="paragraph.title"></h2>
    <div class="content">
      <div class="text" v-if="paragraph.text" v-html="paragraph.text"></div>
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
  margin: auto;
  padding: 10px 30px;
  align-items: center;
  /* text-align: left; */
}
.paragraph .text {
  text-align: left;
}
</style>
