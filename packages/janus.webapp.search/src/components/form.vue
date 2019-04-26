<template>
  <form class="form">
    <div class="form-content row">
      <div class="col">
        <v-input/>
        <v-button/>
      </div>
    </div>
  </form>
</template>

<script>
import Input from '@/components/input'
import Button from '@/components/button'
export default {
  name: 'Form',
  components: {
    'v-input': Input,
    'v-button': Button
  },
  computed: {},
  methods: {},
  data () {
    return {}
  },
  mounted () {}
}
</script>
<style scoped>
.col {
  max-width: 50%;
  position: relative;
  margin: auto;
}
</style>
