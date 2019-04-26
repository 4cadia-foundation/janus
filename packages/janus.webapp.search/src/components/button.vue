<template>
  <button type="submit" class="btn btn-primary">
    <icon-search/>
  </button>
</template>

<script>
import Search from '@/components/search'
export default {
  name: 'button',
  components: {
    'icon-search': Search
  }
}
</script>
<style scoped>
.btn {
  background-color: transparent;
  border-color: transparent;
  border-radius: 16px;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  position: absolute;
  right: 0;
  top: 0;
  outline: none;
  cursor: pointer;
}
.btn:active{
  color: #99abaf;
}
</style>
