<template>
  <li class="list-item item">
    <div class="item-title">
      <a class="link" :href="item.IpfsHash">
        <h2 class="item-text link-text">{{ item.Title || capitalize }} </h2>
      </a>
    </div>
    <div class="item-link">
      <a class="link" :href="item.IpfsHash">
        <h5 class="item-text link-text">{{ item.IpfsHash }}</h5>
      </a>
    </div>
    <div class="item-description">
      <p class="item-text description">{{ item.Description }}</p>
    </div>
    <div class="item-tags">
      <p class="item-text tags">{{ item.Tags }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ItemResult',
  data () {
    return {
    }
  },
  filters: {
    // this filter will can be used to capitalise words
    capitalize: item => {
      return item.toUpperCase()
    }
  },
  props: {
    // this component expects a prop of type object
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.list-item {
  text-align: left;
  list-style: none;
  margin: 30px 0;
  background: #eaeaea;
  padding: 10px;
}
.item-text {
  margin: 5px 0;
}
</style>
