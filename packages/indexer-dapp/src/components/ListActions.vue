<template>
  <div class="list-actions">
    <ul class="menu">
      <li class="menu-item">
        <button type="button" class="btn btn--shadow-dark" @click="handleStarted()">Get Started</button>
      </li>
      <li class="menu-item">
        <button type="button" class="btn btn--outline btn--shadow-dark">Take the tutorial</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListActions',
  data () {
    return {}
  },
  components: {
  },
  mounted () {
  },
  methods: {
    handleStarted: function () {
      // this.$root.$emit('getStarted')
      this.$router.push({ name: 'Indexer' })
    }
  }
}
</script>
<style scoped>
.list-actions .menu-item {
  border-radius: 10px;
  margin: 40px 40px 0 0;
  display: inline-block;
}
.list-actions .menu-item a {
  font-weight: bold;
  text-decoration: none;
  color: var(--color-cyan);
}
.list-actions .menu-item a:hover {
  color: white;
}
.list-actions .btn--outline {
  color: white;
  border-color: white;
}

@media (min-width: 1920px) {
  .list-actions .menu-item .btn-primary,
  .list-actions .menu-item a {
    font-size: 1vw;
  }
}
</style>
