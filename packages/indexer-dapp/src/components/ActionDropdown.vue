<template>
  <div class="submenu dropdown">
    <button class="dropdown-toggle btn btn--outline">{{ title }}</button>
    <v-actions-menu
      ref="actions"
      :actions="actions"
      :element="element"
      :listClasses="`dropdown-menu shadow`"
    />
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown'
import BaseActionsMenu from '@/components/BaseActionsMenu'
export default {
  name: 'ActionDropdown',
  extends: BaseDropdown,
  components: {
    'v-actions-menu': BaseActionsMenu
  },
  data () {
    return {
    }
  },
  methods: {
    handleEmit: function (data) {
      this.$emit(this.callToAction, data)
    }
  },
  props: {
    title: {
      type: String
    },
    element: {
      type: Object
    },
    actions: {
      type: Array
    },
    callToAction: {
      type: String
    }
  },
  mounted: function () {
    this.$refs.actions.$on(this.callToAction, (data) => {
      this.handleEmit(data)
    })
  }
}
</script>

<style>
.dropdown .btn--clear {
  padding: 10px 0;
}
</style>
