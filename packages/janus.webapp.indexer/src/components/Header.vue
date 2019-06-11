<template>
  <div class="header">
    <router-link to="/" class="header_logo">
      <img class="logo" src="../assets/images/logo_clear.png">
      <h2 class="title">Janus</h2>
    </router-link>
    <div :class="`header_menu ${this.showMenu ? 'open' : ''}`">
      <button class="menu-hamburguer btn--icon" @click='toggleShowMenu()'></button>
      <ul class="menu">
        <li class="menu-item" @click='toggleShowMenu()'>
          <router-link to="/">Home</router-link>
        </li>
        <li class="menu-item" @click='toggleShowMenu()'>
          <router-link to="/indexer">Indexer</router-link>
        </li>
        <li class="menu-item" @click='toggleShowMenu()'>
          <router-link to="/about">About</router-link>
        </li>
        <li class="menu-item" @click='toggleShowMenu()'>
          <a target="_blank" href="https://janusproj.atlassian.net/wiki/spaces/PAP/pages/126320921/What+s+Identity">Identity</a>
        </li>
        <li class="menu-item" @click='toggleShowMenu()'>
          <menu-account />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MenuAccount from '@/components/MenuAccount'
export default {
  name: 'Header',
  components: {
    'menu-account': MenuAccount
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleShowMenu: function (value) {
      this.showMenu = !this.showMenu
    }
  },
  mounted: function () {}
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
  /* font-size: 2vw; */
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
.menu {
  position: relative;
  text-align: right;
  align-items: center;
  display: flex;
  margin: auto;
  height: 100%;
}
.menu-item {
  display: inline-block;
}
.menu-item:not(:last-child) {
  margin-right: 10px;
}
.menu-item a {
  text-decoration: none;
  color: var(--color-gray);
}
.menu-hamburguer {
  display: none;
}

/* Media Mobile */
@media (max-width: 768px) {
  .menu-hamburguer {
    display: block;
  }
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
  .header_menu.open .menu {
    right: 0;
  }
  .menu-item {
    margin-right: 10px;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    display: block;
  }
  .menu-hamburguer {
    z-index: 3;
    position: absolute;
    top: 14px;
    right: 20px;
    background-image: url('../assets/images/hamburguer.png');
  }
  .header_menu.open .menu-hamburguer {
    background-image: url('../assets/images/close.png');
  }
}
</style>
