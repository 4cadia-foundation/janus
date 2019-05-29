<template>
  <li class="item">
    <div class="item_icon">
      <img class="icon" :src="item.icon">
    </div>
    <div class="item_title">
      <h5 class="title">{{ item.title || capitalize }}</h5>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ItemIcon',
  data () {
    return {}
  },
  filters: {
    capitalize: item => {
      return item.toUpperCase()
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.item {
  padding: 20px;
  width: 20%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px;
  background: white;
}
.item_icon {
  width: 60px;
  margin: 0 auto 15px;
}
.icon {
  width: 100%;
  height: auto;
}
.icon:hover {
  filter: hue-rotate(180deg);
}
</style>
