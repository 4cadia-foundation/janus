<template>
  <div class="error error--404">
    <div class="error_image"></div>
    <h3 class="error_message">Sorry... This page could not be found</h3>
    <p class="error_description">Go back to our <router-link to="/">Home</router-link> and start to search with Janus</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>
<style scoped>
.error {
  color: rgb(63, 61, 75);
}
.error_image {
  background: url('../assets/images/404.png');
  background-repeat: no-repeat;
  width: 300px;
  margin: auto;
  height: 200px;
  background-size: contain;
  background-position: center;
  display: flex;
}
.error_message {
  font-size: 30px;
  font-weight: 100;
}
.error_description {
  font-size: 18px;
  margin: 10px auto;
}
</style>
