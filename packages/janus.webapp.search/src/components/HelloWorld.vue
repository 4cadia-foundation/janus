<template>
  <div class="form-group">
    <h1>{{ msg }}</h1>
    <div class="form-group">
      <input type="text" class="form-control" id="searchbar" placeholder="Search Here">
      <button type="submit" class="btn">&#128269;</button>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Janus Project"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
  width: 400px;
  border-radius: 20px;
  left: 43%;
  margin: -130px 0 0 -210px;
  width: 700px;  
  position: absolute;
  top: 50%;
  
}
.btn{
  width: 80px;
  border-radius: 20px;
  left: 77%;
  margin: -130px 0 0 -210px;
  width: 49px;  
  position: absolute;
  top: 50%;
  border-color: transparent;
}

</style>
