<template>
  <div class="header">
    <router-link to="/" class="header_logo">
      <img class="logo" src="../assets/images/logo_clear.png">
    </router-link>
    <div class="header_menu">
      <ul class="menu">
        <li class="menu-item">
          <router-link to="/">Search</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/about">About Us</router-link>
        </li>
        <li class="menu-item">
          <a href="https://janusproj.atlassian.net/wiki/spaces/PAP/pages/126320921/What+s+Identity">What's identity?</a>
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
.header_logo .logo {
  width: 25px;
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
</style>
