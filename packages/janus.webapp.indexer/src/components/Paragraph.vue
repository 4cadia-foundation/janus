<template>
  <div class="paragraph">
    <h2 class="subtitle" v-if="paragraph.title" v-html="paragraph.title"></h2>
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
<style>
.paragraph {
  position: relative;
  width: 80%;
  margin: auto;
  align-items: center;
  text-align: left;
}
.text{
  text-align: left;
}
@media (min-width: 1920px) {
  .paragraph .subtitle {
    font-size: 2vw;
  }
  .text {
    font-size: 1.2vw;
  }
}
</style>
