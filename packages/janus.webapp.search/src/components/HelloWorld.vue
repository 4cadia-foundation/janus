<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="form-group">
      <input type="text" class="form-control" id="searchbar" placeholder="Search Here">
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
  width: 400px;
  border-radius: 20px;
  left: 55%;
  margin: -130px 0 0 -210px;
  width: 700px;
  
  position: absolute;
  top: 50%;
}
</style>
