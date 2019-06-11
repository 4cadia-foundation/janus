<template>
  <section>
    <div class="dropdown">
      <div v-if="authenticated">
        <button type="submit" class="btn btn-primary">
          <svg class="icon-account" title="Account" viewBox="0 0 24 24" width="64" height="64" fill=var(--color-green)>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            ></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </button>
      </div>
      <div v-else>
        <button type="submit" class="btn btn-primary">
          <svg class="icon-account" title="Account" viewBox="0 0 24 24" width="64" height="64" fill="currentcolor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            ></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </button>
      </div>

      <div class="dropdown-content">
        <div v-if="authenticated">
          <button @click="handleProfile()"> Profile </button>
          <button @click="handleSignOut()"> Sign Out </button>
        </div>
        <div v-else>
          <button @click="handleOpenModalAuth()"> Sign In </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dropdown',
  components: {},
  computed: {
    ...mapState({
    //  status: state => state.authentication.status
      // data: state => state.authentication.data
    })
  },
  methods: {
    handleProfile: function () {
      this.$router.push({ name: 'Profile' })
    },
    handleOpenModalAuth: function () {
      this.$root.$emit('openModal')
    },
    handleSignOut: function () {
      document.cookie = 'janusToken='
      this.$store.commit('profile/setAuthentication', false)
      this.$store.commit('profile/setResponse', [])
      this.$router.push({ name: 'Home' })
    }
  },
  props: {
    authenticated: {
      type: Boolean,
      required: true
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.btn {
  border: 0;
  width: 40px;
  height: 40px;
  background: none;
  box-shadow: none;
  border: none;
  color: var(--color-gray);
  padding: 0;
}

.btn:hover svg {
  color: var(--color-navy);
}

.icon-account {
  width: 100%;
  height: 100%;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #ffffff;
  min-width: 160px;
  box-shadow: 3px 5px 8px 0px rgba(0, 0, 0, 0.62);
  z-index: 2;
}

.dropdown-content button {
  width: 100%;
  color: black;
  padding: 12px 16px;
  border: none;
  display: block;
  cursor: pointer;
  font-family:'Montserrat', Helvetica, Arial, sans-serif;
  background-color: #ffffff;
  font-size: 1em;
}

.dropdown-content button:hover {
  color: var(--color-primary);
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Media Mobile */
@media (max-width: 768px) {
  .btn {
    display: none;
  }
  .account {
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
