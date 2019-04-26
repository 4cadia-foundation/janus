<template>
  <div>
    <input
      type="text"
      class="form-control input-search"
      placeholder="Enter key word  ..."
      v-on:keyup="onKeyUp"
    >
  </div>
</template>

<script>
export default {
  name: 'input',
  components: {
  },
  methods: {
    onKeyUp: function () {
      return 0
    }
  }
}
</script>

<style scoped>
.input-search {
  border: none;
  border-radius: 16px;
}
.form-control {
  border-radius: 16px;
  border: 1px solid #DCDCDC;
}
</style>
