<template>
  <input
    type="text"
    class="form-control input-search"
    placeholder="Enter key word  ..."
    v-on:keyup="onKeyUp"
  >
</template>

<script>
export default {
  name: 'input',
  components: {},
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
  padding-top: 0px;
  padding-left: 16px;
  color: rgb(63, 61, 75);
  background-color: rgb(255, 255, 255);
  height: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  font-size: 1rem;
  font-family: "Source Sans Pro", -apple-system, sans-serif;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: rgb(204, 204, 204);
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
}
</style>
