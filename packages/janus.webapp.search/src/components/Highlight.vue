<template>
  <div :class="'highlight float--' + float">
    <div class="highlight_background">
      <div class="highlight_content">
        <div class="content content--text">
          <h1 class="title" v-html="highlight.title"></h1>
          <div class="text" v-html="highlight.text"></div>
        </div>
        <div class="content content--image">
          <img :src="highlight.image" alt="">
        </div>
      </div>
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
  position: relative;
  min-height: 20vh;
  height: 40vw;
  overflow: hidden;
  max-height: 90vh;
}
.highlight_background {
  z-index: -1;
  height: 100%;
  -webkit-transform: skew(0deg, -3deg) translateY(-9%);
  transform: skew(0deg, -3deg) translateY(-9%);;
  background-color: #202020;
}
.highlight_background:before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('../assets/images/pattern-prisma.png');
  background-size: 80px;
  opacity: .3;
}
.highlight_content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: skew(0deg, 3deg);
  max-width: 90%;
  margin: auto;
}
.content--text {
  color: white;
  text-align: left;
  width: 50%;
}
.content--text .title {
  margin-top: 0;
  color: white;
}
.content--image,
.content--text {
  vertical-align: middle;
}
.content--image {
  width: 40vw;
  max-width: 800px;
}
.content--image img {
  width: 100%;
}
</style>
