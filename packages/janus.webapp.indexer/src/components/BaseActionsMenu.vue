<template>
  <ul :class="`menu menu-actions ${listClasses}`">
    <li class="menu-item" v-for="(action, index) in this.actions" :key="index">
      <button v-on:click="handleClick(element, action)" :class="`btn btn--clear ${checkActiveTab(action.handler)}`">{{action.title}}</button>
    </li>
  </ul>
</template>

<script>
import BaseMenu from '@/components/BaseMenu'

export default {
  name: 'BaseActionsMenu',
  extends: BaseMenu,
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    handleClick: function (element, action) {
      const emitValue = {}
      emitValue.action = action
      emitValue.element = element
      this.$emit(action.callToAction, emitValue)
    },
    checkActiveTab (tab) {
      return tab === this.activeTab ? 'active-tab' : ''
    }
  },
  props: {
    actions: {
      type: Array
    },
    element: {
      type: Object
    },
    listClasses: {
      type: String
    },
    activeTab: {
      type: String
    }
  },
  mounted: function () {
  }
}
</script>

<style lang="css">
.menu-actions.tabs .menu-item .btn {
  padding: 10px 5px;
  border-bottom: 3px solid transparent;
}
.menu-actions.tabs .menu-item .active-tab {
  font-weight: 600;
  border-radius: 0;
  color: var(--color-primary);
  border-color: var(--color-primary);
  transition: .2s all linear;
}
</style>
