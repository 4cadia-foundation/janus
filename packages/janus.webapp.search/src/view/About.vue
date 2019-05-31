<template>
  <div class="container">
    <div class="content">
      <div class="col">
        <v-highlight v-for="(item, index) in this.content.list_highlight" :key="index" :highlight="item" float="right"/>
      </div>
      <div class="col">
        <h2 class="subtitle"> Advantages of using Web 3.0</h2>
        <ul class="list-icon">
          <v-item-icon v-for="(item, index) in this.content.list_icon" :key="index" :item="item"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Highlight from '@/components/Highlight'
import ItemIcon from '@/components/ItemIcon'
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
    'v-item-icon': ItemIcon
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
  color: #424242;
  margin: 50px 0;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 25px;
  max-width: 60%;
  margin: 20px auto 50px;
}

.list-icon {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
}
</style>
