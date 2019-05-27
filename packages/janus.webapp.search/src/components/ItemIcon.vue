<template>
  <li class="list-icon">
    <div class="item">
      <div class="item_icon">
        <img class="icon" :src="item.icon">
      </div>
      <div class="item_title">
        <h5 class="title">{{ item.title || capitalize }}</h5>
      </div>
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
.list-icon {
  display: inline-block;
  width: 100px;
  margin: auto 100px;
}
.item {
  display: flex;
  flex-direction: column;
}
.item_icon {
  width: 60px;
  margin: 0 auto 15px;
}
.icon {
  width: 100%;
  height: auto;
}
</style>
