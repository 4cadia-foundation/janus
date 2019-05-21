<template>
  <li class="list-item">
    <div class="item">
      <div class="item_title item--text">
        <a class="link" :href="item.IpfsHash">
          <h2 class="link-text">{{ item.title || capitalize }} </h2>
        </a>
      </div>
      <div class="item_link item--text">
        <a class="link" :href="item.IpfsHash">
          <h5 class="link_text">{{ item.storageHash }}</h5>
        </a>
      </div>
      <div class="item_description item--text">
        <p class="description">{{ item.description }}</p>
      </div>
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
  pointer-events: all;
  user-select: none;
  height: 80px;
  overflow: hidden;
  padding: 10px 20px 20px;
  transition: all 0.15s ease 0s;
  text-align: left;
  margin: 0 auto 10px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: rgb(204, 204, 204);
  border-radius: 4px;
  background:  rgb(250, 250, 250);
}
.item--text {
  margin: 5px 0;
  color: #666666;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  line-height: 1.5;
}
</style>
