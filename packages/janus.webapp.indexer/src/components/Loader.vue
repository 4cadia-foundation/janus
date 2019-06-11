<template>
  <div class="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  components: {
  },
  props: {
  }
}
</script>

<style scoped>
.loading {
  margin: 20px auto 10px;
  height: 35px;
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.loader {
  display: block;
  margin: auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 5px solid rgba(83,167,250, 0.2);
  border-right: 5px solid rgba(83,167,250, 0.2);
  border-bottom: 5px solid rgba(83,167,250, 0.2);
  border-left: 5px solid var(--color-primary);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
