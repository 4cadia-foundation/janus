<template>
  <div :class="`card shadow--light ${this.cardType}`">
    <div v-if="this.$slots.header" class="card_content card_header">
      <slot name="header"></slot>
    </div>
    <div v-if="this.$slots.body" class="card_content card_body">
      <slot name="body"></slot>
    </div>
    <div v-if="this.$slots.footer" class="card_content card_footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  data () {
    return {
    }
  },
  filters: {
    capitalize: item => {
      return item.toUpperCase()
    }
  },
  props: {
    cardType: {
      type: String
    }
  },
  components: {
  },
  mounted () {
  }
}
</script>

<style>
.card {
  padding: 40px 30px;
  text-align: center;
  height: 100%;
  position: relative;
  border: 1 px solid var(--color-gray-lighter);
  box-sizing: border-box;
  border-radius: 4px;
  background: white;
}
.card h3 {
  margin: 1em auto;
}
.card.full {
  display: flex;
  justify-content: space-between;
  padding: 30px 60px;
  border-radius: 8px;
  border-left-width: 10px;
  flex-flow: row wrap;
}
.card.full .card_content {
  margin: auto 0;
  height: auto;
}
.card.full .card_header {
  text-align: left;
  max-width: 70%;
  word-break: break-all;
}
.card.full .card_body {
  text-align: right;
}
.card.full .card_footer {
  text-align: left;
  flex: 1 100%;
}
.card.full .card_footer p {
  margin: 10px 0 0 0;
}
.card.full .card_title .title {
  margin: auto 0;
}
.card.full.success {
  border-left-color: var(--color-green);
}
.card.full.alert {
  border-left-color: var(--color-red);
}
.card.full.warn {
  border-left-color: var(--color-yellow);
}
</style>
