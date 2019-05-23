<template>
  <li class="list-item">
    <div class="item">
      <a :href="ipfsUrl + item.storageHash" target="_blank" class="link">
        <div class="item_title item--text">
          <h2 class="title_text text">{{ item.title || capitalize }} </h2>
        </div>
        <div class="item_hash item--text">
            <h5 class="hash_text text">{{ item.storageHash }}</h5>
        </div>
        <div class="item_description item--text">
          <p class="description_text text">{{ item.description }}</p>
        </div>
      </a>
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
    },
    ipfsUrl: {
      type: String,
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
  border-color: var(--color-gray-lighter);
  border-radius: 4px;
  background:  var(--color-white);
}
.list-item:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
}
.item--text {
  margin: 5px 0;
  color: var(--color-gray);
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  line-height: 1.5;
}
.link:hover .title_text {
  color: var(--color-primary);
}
</style>
