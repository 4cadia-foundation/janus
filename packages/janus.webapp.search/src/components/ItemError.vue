<template>
  <li class="error">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'ItemError',
  data () {
    return {}
  },
  props: {
    error: {
      type: Object
    }
  },
  mounted () {
  }
}
</script>
