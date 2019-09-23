<template>
  <div class="header">
    <router-link to="/" class="header_logo">
      <img class="logo" :src="`${this.logo}`">
      <span class="title logo">{{ this.title }}</span>
    </router-link>
    <div :class="`header_menu ${this.showMenu ? 'open' : ''}`">
      <v-menu :menu="this.menu" v-on:handleMenuClick="handleMenuClick"/>
      <button class="btn--icon menu-hamburguer" @click='toggleShowMenu()'></button>
      <v-login-menu />
    </div>
  </div>
</template>

<script>
import contentService from '../api/contentService'
import LoginMenu from '@/components/LoginMenu'
import BaseMenu from '@/components/BaseMenu'

export default {
  name: 'Header',
  components: {
    'v-login-menu': LoginMenu,
    'v-menu': BaseMenu
  },
  data () {
    return {
      showMenu: false,
      menu: [],
      logo: '',
      title: ''
    }
  },
  methods: {
    toggleShowMenu: function (value) {
      this.showMenu = !this.showMenu
    },
    handleMenuClick: function (link) {
      if (this.showMenu) this.toggleShowMenu()
    }
  },
  mounted: function () {
    contentService('header').then((response) => {
      this.menu = response.data.menu
      this.logo = response.data.logo
      this.title = response.data.title
    })
  }
}
</script>

<style scoped>

.header {
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  background: white;
}
.header_logo {
  text-decoration: none;
}
.header_logo .logo {
  width: 25px;
}
.header_logo .logo,
.header_logo .title {
  display: inline-block;
  vertical-align: middle;
}
.header_logo .title {
  margin: 0 0 0 10px;
}
.header_menu {
  display: flex;
}
.header_menu .menu-hamburguer {
  display: none;
}

/* Media Mobile */
@media (max-width: 768px) {
  .header_menu {
    flex-direction: row-reverse;
    align-content: center;
  }
  .header_menu .menu-hamburguer {
    display: block;
    height: auto;
    z-index: 3;
    margin-left: 10px;
    background-image: url('../assets/images/hamburguer.png');
  }
  .header_menu.open .menu {
    right: 0;
  }
  .header_menu.open .menu-hamburguer {
    background-image: url('../assets/images/close.png');
  }
  .header {
    display: flex;
    align-items: center;
  }
}
</style>
