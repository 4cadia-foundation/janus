<template>
  <div class="error error-404">
    <h3 class="error-message">{{ message }}</h3>
    <div class="error-image"></div>
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
  },
  props: {
    message: {
      type: String,
      required: false
    }
  }
}
</script>
<style scoped>
.error-image {
  background: url('../assets/images/404.png');
  background-repeat: no-repeat;
  width: 300px;
  margin: auto;
  height: 200px;
  background-size: contain;
  background-position: center;
  display: flex;
}
.error-message {
  font-size: 20px;
  font-weight: 100;
}
</style>
