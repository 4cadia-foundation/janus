<template>
  <li class="list-item item">
    <div class="item-title">
      <a class="link" :href="item.link">
        <h2 class="title">{{ item.title || capitalize }} </h2>
      </a>
    </div>
    <div class="item-link">
      <a class="link" :href="item.link">
        <h5 class="link-text">{{ item.link }}</h5>
      </a>
    </div>
    <div class="item-description">
      <p class="description">{{ item.desc }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ItemList',
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
.title,
.link-text,
.description {
  margin: 5px 0;
}
</style>
