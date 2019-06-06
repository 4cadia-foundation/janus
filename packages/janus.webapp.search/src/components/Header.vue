<template>
  <div class="header">
    <router-link to="/" class="header_logo">
      <img class="logo" src="../assets/images/logo_clear.png">
      <h2 class="title">Janus</h2>
    </router-link>
    <div class="header_menu">
      <ul class="menu">
        <li class="menu-item">
          <router-link to="/">Search</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/about">About</router-link>
        </li>
        <li class="menu-item">
          <a target="_blank" href="https://janusproj.atlassian.net/wiki/spaces/PAP/pages/126320921/What+s+Identity">Identity</a>
        </li>
        <li class="menu-item">
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
.menu-item a {
  text-decoration: none;
}
.menu-item:not(:last-child) {
  margin-right: 10px;
}
</style>
