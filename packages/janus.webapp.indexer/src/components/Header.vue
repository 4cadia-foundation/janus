<template>
  <div class="header">
    <ul class="menu">
      <li class="menu-item">
        <router-link to="/">Home</router-link>
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
  padding: 20px 30px;
}
.menu {
  position: relative;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  display: flex;
}
.menu-item {
  display: inline-block;
}
.menu-item:not(:last-child) {
  margin-right: 10px;
}
</style>
