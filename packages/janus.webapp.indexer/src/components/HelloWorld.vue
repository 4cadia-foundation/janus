<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <div class="form-component">
      <v-form />
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form'
export default {
  name: 'HelloWorld',
  components: {
    'v-form': Form
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
