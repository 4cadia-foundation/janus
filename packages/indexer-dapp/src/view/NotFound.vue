<template>
  <div class="container container--notfound">
    <div class="wrapper">
      <div class="title">
        <h1>404</h1>
      </div>
      <h2>Page not found</h2>
      <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <div class="action">
        <router-link class="btn btn--link btn--outline" to="/">Go back to Home</router-link>
      </div>
    </div>
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

.container--notfound {
  position: relative;
  height: 80vh;
}

.container--notfound .wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.container--notfound .title {
  height: 280px;
  position: relative;
  z-index: -1;
}

.container--notfound .title h1 {
  font-size: 230px;
  margin: 0px;
  font-weight: 900;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  background: url('../assets/images/hero.jpg') repeat;
  background-color: #442ab0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: cover;
  background-position: center;
}

.container--notfound h2 {
  margin-top: 0;
}

.container--notfound .action {
  box-sizing: border-box;
  margin: 50px auto;
}

.container--notfound a {
  margin: 20px 0;
}

@media only screen and (max-width: 767px) {
  .container--notfound .title {
    height: 142px;
    background-color: #f8f9fa;
  }
  .container--notfound .title h1 {
    font-size: 112px;
  }
}
</style>
