<template>
  <ul class="list-icon">
    <li class="item" v-for="(item, index) in list" :key="index">
      <div class="item_icon">
        <img class="icon" :src="item.icon">
      </div>
      <div class="item_title">
        <h5 class="title">{{ item.title || capitalize }}</h5>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ListIcon',
  data () {
    return {}
  },
  filters: {
    capitalize: item => {
      return item.toUpperCase()
    }
  },
  props: {
    list: {
      type: Object
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.list-icon {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  max-width: 80%;
}

.item {
  width: 20%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px;
  background: white;
}
.item_icon {
  width: 5vw;
  margin: 15px auto;
}
.icon {
  width: 100%;
  height: auto;
}
.icon:hover {
  filter: hue-rotate(180deg);
}
.item_title {
  padding: 0 10px 15px;
}
</style>
