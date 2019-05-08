<template>
    <A v-on:click="handleClick()">About me!</A>
  </template>

<script>
export default{
  methods: {
    handleClick: function (value) {
      this.$router.push('about')
    }
  }
}
</script>
<style scoped>

</style>
