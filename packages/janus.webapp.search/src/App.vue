<template>
  <div id="app" v-bind:class="{ 'lock-screen': this.lockScreen }">
    <v-header/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    'v-header': Header
  },
  data () {
    return {
      lockScreen: false
    }
  },
  mounted () {
    let appComponent = this
    this.$store.dispatch('search/getWeb3Config')
    this.$root.$on('toggleMenu', function (toggleMenu) {
      appComponent.toggleShowMenu(toggleMenu)
    })
  },
  methods: {
    toggleShowMenu: function (toggleMenu) {
      this.lockScreen = toggleMenu
    }
  }
}
</script>

<style>
@import './assets/styles/variables.css';
@import './assets/styles/base.css';
@import './assets/styles/utils.css';
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#app.lock-screen {
  height: 100vh;
  overflow: hidden;
}
#app.lock-screen::before {
  content: '';
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
