<template>
  <div :class="'highlight float--' + float">
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
  height: 30vw;
  display: flex;
  align-items: center;
  margin-bottom: 5%;
}
.highlight::after,
.highlight::before {
  content: '';
  display: block;
  top: -30%;
  right: 0;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 130%;
  -webkit-transform: skew(0deg, -10deg);
  transform: skew(0deg, -5deg);
}
.highlight::after {
  background: url('../assets/images/pattern-black.png');
  opacity: .8;
}
.highlight::before {
  background: var(--color-navy);
}
.content--text {
  width: 50%;
  vertical-align: middle;
  margin-left: 60px;
  color: white;
  text-align: left;
}
.content--text .title {
  font-size: 3vw;
  color: white;
  margin-top: 0;
}
.content--text .text {
  font-size: 1.5vw;
}
.content--image img {
  position: absolute;
  right: 5%;
  top: 0;
  height: 90%;
}
</style>
