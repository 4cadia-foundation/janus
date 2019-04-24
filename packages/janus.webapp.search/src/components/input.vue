<template>
  <div>
    <b-form @submit.stop.prevent>
          <b-input-group class="mt-3" >
      <b-form-input  class="input-search" placeholder="Search Here"></b-form-input>
        <b-input-group-append>
             <button-icon/>
        </b-input-group-append>
    </b-input-group>
      <b-form-text id="search-help-block">
        Exemplo texto de ajuda
      </b-form-text>
    </b-form>
  </div>
</template>
<script>

import ButtonIcon from '@/components/button'
export default {
  name: 'input-search',
  components: {
    'button-icon': ButtonIcon
  }
}

</script>
<style scoped>
    .input-search{
        border: none;
        border-radius: 16px;
}
.input-group {
    border-radius: 16px;
    border: 1px solid #DCDCDC;
}
</style>
