<template>
  <div class="list-actions">
    <ul class="menu">
      <li class="menu-item">
        <button type="button" class="btn btn-primary" @click="handleStarted()">Get Started</button>
      </li>
      <li class="menu-item">
        <a href="#documentation">Take the tutorial</a>
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
.list-actions .menu-item .btn-primary {
  /* font-size: 1.4vw; */
  height: 50px;
}
.list-actions .menu-item .btn-primary:hover {
  box-shadow: rgb(0, 0, 0) 3px 3px 4px;
}
.list-actions .menu-item a {
  /* font-size: 1.4vw; */
  font-weight: bold;
  text-decoration: none;
  color: var(--color-cyan);
}
.list-actions .menu-item a:hover {
  color: white;
}
</style>
