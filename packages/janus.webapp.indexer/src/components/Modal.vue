<template>
  <div>
    <transition name="modal" v-if="showModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                  <h3> Sign In </h3>
                  <button class="btn--icon btn--close" @click="closeModal"></button>
                </slot>
              </div>
              <div class="modal-body">
                <slot name="body">
                  <p>To sign in Janus it is necessary create a decentralized identity.</p>
                </slot>
              </div>
              <loader v-if="this.isLoading"></loader>
              <div class="modal-footer">
                <slot name="footer">
                  <button class="modal-button civic logo-civic" @click="handleCivic" v-bind:class="{'button-disabled': disableCivic}">
                    Civic
                  </button>
                  <button class="modal-button metamask logo-metamask" @click="handleMetaMask" v-bind:class="{'button-disabled': disableMetaMask}">
                    MetaMask
                  </button>
                  <button class="modal-button uPort logo-uPort" @click="handleuPort" v-bind:class="{'button-disabled': disableuPort}">
                    uPort
                  </button>
                  <div class="modal-error-message" v-if="showError">
                    <p>Could not log in, try again later.</p>
                  </div>
                </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import axios from 'axios'
import { mapState } from 'vuex'
import Web3 from 'web3'
import { ethers } from 'ethers'

export default {
  name: 'Modal',
  components: {
    'loader': Loader
  },
  computed: {
    ...mapState({
      userID: state => state.profile.userID,
      data: state => state.profile.data,
      activeAccount: state => state.web3.account
    })
  },
  methods: {
    closeModal: function () {
      this.showModal = false
    },
    openModal: function () {
      this.showModal = true
    },
    handleMetaMask: async function () {
      let signer
      let provider
      let web3
      try {
        // eslint-disable-next-line
        web3 = new Web3(ethereum)
        // Solicita acesso a carteira Ethereum se necessário
        // eslint-disable-next-line
        let accounts = await ethereum.enable()
        if (typeof web3 !== 'undefined') {
          // Use Mist/MetaMask's provider
          this.$store.dispatch('web3/registerWeb3')
          provider = new ethers.providers.Web3Provider(web3.currentProvider)
          let originalCookie = []
          signer = provider.getSigner()
          signer.getAddress()
            .then((addr) => {
              console.log(' handleMetaMask addr ', addr, ' signer ', signer)
              originalCookie = addr
              provider.getNetwork()
                .then((network) => {
                  console.log(' handleMetaMask network...', network)
                  axios.post(process.env.IDENTITY_BASE_URL, {'token': originalCookie})
                    .then((response) => {
                      // console.log(response.data)
                      this.$store.commit('profile/setResponse', response.data)
                      document.cookie = 'janusToken=' + originalCookie
                      this.closeModal()
                      this.$router.push({ name: 'Home' })
                    }, (err) => {
                      console.log(err.response)
                      console.log(err)
                      console.error('handleMetaMask erro vindo do backend ', err)
                      this.showError = true
                    })
                })
            })
        }
      } catch (err) {
        console.error('handleMetaMask error ', err)
        alert('You need to have MetaMask installed or grant this page to access your account.')
      }
      // console.log(originalCookie)
    },
    handleuPort: function () {
      console.log('clicou')
    },
    handleCivic: function () {
      /* global Civic */
      /* eslint no-undef: "error" */
      console.log(process.env.CIVICID)
      let civicSip = new Civic({appId: `${process.env.CIVICID}`})
      civicSip.signup({style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP})
      civicSip.on('auth-code-received', event => {
        if (event.response) {
          // console.log(event.response)
          this.isLoading = true
          let originalCookie = event.response
          axios.post(process.env.IDENTITY_BASE_URL, {'token': event.response})
            .then((response) => {
              console.log(response.data)
              this.$store.commit('profile/setResponse', response.data)
              document.cookie = 'janusToken=' + originalCookie
              this.closeModal()
              this.isLoading = false
              this.$router.push({ name: 'Home' })
            }, () => {
              this.showError = true
            })
        }
      })
    }
  },
  data () {
    return {
      showModal: false,
      showError: false,
      isLoading: false,
      disableCivic: process.env.DISABLE_IDENTITY_CIVIC,
      disableMetaMask: process.env.DISABLE_IDENTITY_METAMASK,
      disableuPort: process.env.DISABLE_IDENTITY_UPORT
    }
  },
  mounted: function () {
    this.$root.$on('openModal', () => {
      this.openModal()
    })
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 20vw;
  min-width: 300px;
  margin: 0 auto;
  padding: 2% 2% 4% 2% ;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-header h3 {
  margin-top: 0;
  color: #5436D6;
}

.modal-body {
  margin-bottom: 25px;
}

.modal-body p {
  margin: 20px 0;
  display: flex;
  text-align: left;
}

.modal-default-button {
  border: 0;
  background: none;
  box-shadow: none;
  border: none;
  padding: 0 5px 0 5px;
  cursor: pointer;
}

.modal-button {
  width: 220px;
  height: 44px;
  font-family:'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 12pt;
  font-weight: 700;
  color: #FFFFFF;
  border-radius: 33px;
  border: 0;
  border: none;
  padding: 0 5px 0 25px;
  cursor: pointer;
  margin-top: 5%;
}

/* logo Civic */
.modal-button.civic {
  background: url("../assets/images/civic.svg")  no-repeat 15px center, #3AB03E;
  background-size: 23px;
}

/* logo MetaMask */
.modal-button.metamask {
  background: url("../assets/images/metamask-logo.svg")  no-repeat 15px center, #F79220;
  background-size: 23px;
}

/* logo uPort */
.modal-button.uPort {
  background: url("../assets/images/uport-logo.png")  no-repeat 15px center, #5c50ca;
  background-size: 23px;
}

.modal-close-button {
  border: 0;
  background: none;
  box-shadow: none;
  border: none;
  padding: 0 8px 0 ;
  cursor: pointer;
  font-weight: 800;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
}

.modal-error-message {
    text-align: center;
    padding-top: 20px;
    color: var(--color-red);
}

.button-disabled {
  /* background: silver !important; */
  cursor: not-allowed;
  opacity: .2;
}

/* Media Mobile */
@media (max-width: 768px) {
  .modal-container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 70px;
    box-sizing: border-box;
  }
}
</style>
