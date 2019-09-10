<template>
  <ul class="menu">
    <li class="menu-item actions" v-for="(link, index) in this.menu" :key="index">
      <router-link v-if="link.path" :to="link.path">
        <span v-on:click="handleMenuClick(link)">{{link.title}}</span>
      </router-link>
      <a target="_blank" v-else-if="link.href" :href="link.href">
        <span v-on:click="handleMenuClick(link)">{{link.title}}</span>
      </a>
      <v-dropdown-menu v-else-if="link.sublinks" :dropdown="link"/>
      <span v-else v-on:click="handleMenuClick(link)">{{link.title}}</span>
    </li>
  </ul>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown'

export default {
  name: 'BaseMenu',
  components: {
    'v-dropdown-menu': BaseDropdown
  },
  data () {
    return {
    }
  },
  methods: {
    handleMenuClick: function (link) {
      this.$emit('handleMenuClick', {'link': link})
    }
  },
  props: {
    menu: {
      type: Array
    }
  }
}
</script>

<style>
.menu {
  position: relative;
  text-align: right;
  align-items: center;
  display: inline-block;
  margin: auto;
  height: auto;
  vertical-align: middle;
}
.menu-item {
  display: inline-block;
  padding: 0 10px;
}
.menu-item a {
  text-decoration: none;
  color: var(--color-gray);
}
.menu-item a:hover {
  color: var(--color-blue);
}

/* Media Mobile */
@media (max-width: 768px) {
  .menu {
    position: fixed;
    width: 70vw;
    height: 100%;
    z-index: 2;
    background: white;
    top: 0;
    right: -70vw;
    padding: 60px 0;
    display: block;
    transition: all linear .3s;
  }
  .menu-item {
    margin-right: 10px;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    display: block;
  }
}
</style>
