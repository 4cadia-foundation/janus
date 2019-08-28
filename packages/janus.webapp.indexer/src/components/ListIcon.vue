<template>
  <div class="list-icon">
    <h2 class="subtitle">{{list.title}}</h2>
    <ul class="list">
      <li class="item" v-for="(item, index) in list.data" :key="index">
        <div class="item_icon" v-if="item.icon">
          <img class="icon" :src="item.icon">
          <img class="icon shadow" :src="item.icon">
        </div>
        <div class="content">
          <div class="item_title" v-if="item.title">
            <h5 class="title" v-html="item.title || capitalize"></h5>
          </div>
          <div class="item_text" v-if="item.text">
            <h5 class="text" v-html="item.text"></h5>
          </div>
        </div>
      </li>
    </ul>
  </div>
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
  components: {
  },
  mounted () {
  }
}
</script>
<style scoped>
.list-icon .subtitle {
  margin-bottom: 40px;
  font-size: 1.8em;
}
.list {
  margin: auto;
  max-width: 80%;
}
.item {
  align-items: center;
  display: flex;
  text-align: left;
  padding: 60px 40px 60px 60px;
  margin-bottom: 40px;
  border: 2px dotted var(--color-primary);
  border-radius: 30px;
}
.item_icon {
  width: 6vw;
  height: 6vw;
  margin-right: 40px;
  position: relative;
}
.item_icon .shadow {
  position: absolute;
  top: 3px;
  left: 3px;
  opacity: .3;
  filter: blur(2px);
}
.icon {
  width: 100%;
  height: auto;
}
.item_icon,
.content {
  display: inline-block;
}
.content {
  vertical-align: middle;
  width: 80%;
}
.item_title {
  margin-bottom: 10px;
  color: var(--color-navy);
}
.item_text h5 {
  font-weight: 100;
}
/* Media Mobile */
@media (max-width: 768px) {
  .item {
    padding: 10%;
    display: block;
  }
  .item .content {
    width: fit-content;
  }
  .item_icon {
    width: 60px;
    height: auto;
    margin-bottom: 20px;
  }
}
@media (min-width: 1920px) {
  .list-icon .subtitle {
    font-size: 2vw;
  }
  .item .content {
    width: fit-content;
  }
  .item_title .title {
    font-size: 1.5vw;
  }
  .item_text .text {
    font-size: 1vw;
  }
}
</style>
