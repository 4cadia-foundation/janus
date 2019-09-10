<template>
  <div class="login">
    <v-dropdown :position="'right'">
      <template v-slot:toggle>
        <button class="btn-icon btn--clear">
          <svg class="icon-login" title="Account" viewBox="0 0 24 24" width="64" height="64" :fill="isAuthenticated ? 'var(--color-green)' : 'currentcolor'">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            ></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </button>
      </template>
      <template v-slot:menu>
        <div class="dropdown-content" v-if="isAuthenticated">
            <button class="btn" @click="handleProfile()"> Profile </button>
            <button class="btn" @click="handleSignOut()"> Sign Out </button>
            <button class="btn" @click="handleOpenMyAccount()"> My Account </button>
        </div>
        <div class="dropdown-content" v-else>
          <button class="btn" @click="handleOpenModalAuth()"> Sign In </button>
        </div>
      </template>
    </v-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseDropdown from '@/components/BaseDropdown'

export default {
  name: 'LoginMenu',
  components: {
    'v-dropdown': BaseDropdown
  },
  computed: {
    ...mapState({
      activeAccount: state => state.web3.account,
      isAuthenticated: state => state.authentication.isAuthenticated
    })
  },
  data () {
    return {
      // activeAccount: 'Active account does not exists'
      enableIdentity: process.env.IDENTITY,
      signIn: false
    }
  },
  methods: {
    handleClick: function (value) {
      this.$refs.dropdown.openDropDown()
    },
    handleProfile: function () {
      this.$router.push({ name: 'Profile' })
    },
    handleOpenModalAuth: function () {
      this.$root.$emit('openModal')
    },
    handleOpenMyAccount: function () {
      this.$router.push({ name: 'Account' })
    },
    handleSignOut: function () {
      this.$store.dispatch('authentication/logout')
      this.$store.commit('profile/setResponse', [])
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.login {
  text-align: right;
  -webkit-align-items: center;
  display: flex;
  align-items: center;
}

.btn-icon {
  width: 50px;
  height: 50px;
  display: block;
}

.icon-login {
  width: 100%;
  height: 100%;
}

/* Dropdown */

.dropdown-content {
  display: flex;
  flex-direction: column;
}

.dropdown-content .btn {
  width: max-content;
  color: var(--color-gray);
  border: 1px solid var(--color-gray-lighter);
  border-radius: 0%;
  display: block;
  cursor: pointer;
  background-color: #ffffff;
  text-transform: none;
  font-weight: 500;
  min-width: -webkit-fill-available;
}

.dropdown-content .btn:hover {
  color: var(--color-blue);
}

/* Media Mobile */
@media (max-width: 768px) {
  .login {
    display: block;
  }
  .dropdown-content {
    display: block;
    position: relative;
    width: 100%;
    box-shadow: none;
  }
}
</style>
