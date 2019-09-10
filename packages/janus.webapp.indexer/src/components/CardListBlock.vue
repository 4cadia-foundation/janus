<template>
  <div class="list-cards">
    <h2 class="list-title">{{list.title}}</h2>
    <ul :class="`list ${oddOrEven}`">
      <li :class="`item`" v-for="(item, index) in list.data" :key="index">
        <v-card ref="card" :cardType="cardStyle">
          <template v-slot:header>
            <img class="item_icon" v-if="item.icon" :src="item.icon">
            <h3 class="title" v-html="item.title || capitalize"></h3>
          </template>

          <template v-slot:body>
            <div class="text" v-html="item.text"></div>
          </template>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard'

export default {
  name: 'CardListBlock',
  data () {
    return {
      oddOrEven: this.list.data.length % 2 === 0 ? 'even' : 'odd'
    }
  },
  filters: {
    capitalize: item => {
      return item.toUpperCase()
    }
  },
  props: {
    list: {
      type: Object
    },
    cardStyle: {
      type: String
    }
  },
  components: {
    'v-card': BaseCard
  },
  mounted () {
  }
}
</script>
<style scoped>
.list {
  display: flex;
  margin: auto;
  justify-content: space-between;
  flex-wrap: wrap;
}

.list .item {
  flex: 31%;
  max-width: 31%;
  margin: 20px 0;
}

.list.even {
  padding: 10px 30px;
}

.list.even .item {
  flex: 48%;
  max-width: 48%;
}

.item_icon {
  width: 6vw;
  height: 6vw;
  position: relative;
}

@media (max-width: 768px) {
  .list {
    flex-direction: column;
  }

  .list .item {
    width: auto !important;
    margin-bottom: 10px;
  }
}
</style>
