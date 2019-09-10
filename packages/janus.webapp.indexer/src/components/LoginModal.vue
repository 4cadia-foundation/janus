<template>
  <div class="login-modal">
    <v-modal ref="modalLogin" :loading="this.isLoading">
      <template v-slot:header>
        <h3> Sign In </h3>
      </template>

      <template v-slot:body>
        <div class="modal-subtitle">
          <p>To sign in Janus it is necessary create a decentralized identity.</p>
          <p>Choose your login provider:</p>
        </div>
        <div class="modal-content">
          <button class="btn btn--login btn--civic" @click="handleCivic" v-bind:class="{'button-disabled': disableCivic}"> Civic </button>
          <button class="btn btn--login btn--metamask" @click="handleMetaMask" v-bind:class="{'button-disabled': disableMetaMask}"> MetaMask </button>
          <button class="btn btn--login btn--uPort" @click="handleuPort" v-bind:class="{'button-disabled': disableuPort}"> uPort </button>
        </div>
      </template>

      <template v-slot:footer>
        <div class="modal-error-message" v-if="showError">
          <p>Could not log in, try again later.</p>
        </div>
      </template>
    </v-modal>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal'
import { mapState } from 'vuex'

export default {
  name: 'LoginModal',
  extends: BaseModal,
  computed: {
    ...mapState({
      isAuthenticated: state => state.authentication.isAuthenticated
    })
  },
  data () {
    return {
      showError: false,
      isLoading: false,
      disableCivic: process.env.DISABLE_IDENTITY_CIVIC,
      disableMetaMask: process.env.DISABLE_IDENTITY_METAMASK,
      disableuPort: process.env.DISABLE_IDENTITY_UPORT
    }
  },
  components: {
    'v-modal': BaseModal
  },
  methods: {
    handleMetaMask: function () {
      this.isLoading = true
      this.$store.dispatch('authentication/loginMetaMask')
    },
    handleuPort: function () {
      console.log('clicou')
    },
    handleCivic: function () {
      this.isLoading = true
      this.$store.dispatch('authentication/loginCivic')
    }
  },
  mounted: function () {
    this.$root.$on('openModalLogin', () => {
      this.$refs.modalLogin.openModal()
    })
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'authentication/setAuthentication':
          if (state.authentication.authProvider) {
            console.log(`User logged in using ${state.authentication.authProvider}`)
          } else {
            console.log(`User logout`)
          }
          this.isLoading = false
          this.$refs.modalLogin.closeModal()
          break
      }
    })
  }
}
</script>

<style>
.login-modal .modal-container {
  color: black;
}
.login-modal .modal-content {
  margin-top: 50px;
}
.login-modal .modal-content .modal-row {
  text-align: left;
}
.login-modal .modal-content .modal-row h4 {
  margin: auto;
}
.login-modal .modal-row .row-wrapper {
  margin: 10px 0;
}
.login-modal .modal-row .row-content {
  display: inline-block;
  vertical-align: middle;
}

.login-modal .btn--login {
  height: 60px;
  min-width: 250px;
  display: block;
  margin: 20px auto;
  font-size: .9em;
  color: #FFFFFF;
  border: none;
  text-align: left;
  padding: 0 30px 0 110px;
  background-size: 70px;
  background-repeat: no-repeat;
  background-position: 20px center;
}

/* logo Civic */
.login-modal .btn--civic {
  background-image: url("../assets/images/civic.svg");
  background-color: #3AB03E;
}

/* logo MetaMask */
.login-modal .btn--metamask {
  background-image: url("../assets/images/metamask-logo.svg");
  background-color: #F79220;
}

/* logo uPort */
.login-modal .btn--uPort {
  background-image: url("../assets/images/uport-logo.png");
  background-color: #5c50ca;
}
</style>
