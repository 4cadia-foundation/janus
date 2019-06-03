<template>
  <div class="container">
    <div class="content">
      <div class="col">
        <v-highlight v-for="(item, index) in this.content.list_highlight" :key="index" :highlight="item" float="right"/>
      </div>
      <div class="col">
        <h2 class="subtitle"> Advantages of using Web 3.0</h2>
        <v-list-icon :list="this.content.list_icon"/>
      </div>
    </div>
  </div>
</template>

<script>
import Highlight from '@/components/Highlight'
import ListIcon from '@/components/ListIcon'
import aboutContent from '@/utils/about.json'

export default {
  name: 'About',
  data () {
    return {
      content: aboutContent
    }
  },
  components: {
    'v-highlight': Highlight,
    'v-list-icon': ListIcon
  }
}
</script>

<style scoped>
.container {
  margin-top: 0;
}

.col {
  position: relative;
}

.subtitle {
  color: var(--color-primary);
  margin: 50px 0;
  font-size: 2.3vw;
  max-width: 60%;
  margin: 100px auto 50px;
}
</style>
