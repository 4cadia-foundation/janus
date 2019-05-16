<template>
  <li class="list-item item">
    <div class="item-title">
      <a class="link" :href="item.IpfsHash">
        <h2 class="item-text link-text">{{ item.title || capitalize }} </h2>
      </a>
    </div>
    <div class="item-link">
      <a class="link" :href="item.IpfsHash">
        <h5 class="item-text link-text">{{ item.storageHash }}</h5>
      </a>
    </div>
    <div class="item-description">
      <p class="item-text description">{{ item.description }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ItemResult',
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
      type: Object,
      required: true
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.list-item {
  text-align: left;
  list-style: none;
  margin: 30px 0;
  background: #f9f9f9;
  padding: 10px;
  max-width: 50%;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
}
.item-text {
  margin: 5px 0;
}
</style>
