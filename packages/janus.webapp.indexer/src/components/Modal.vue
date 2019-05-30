<template>
    <div>
        <transition name="modal" v-if="showModal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <slot name="header">
                                <h3> Sign In </h3>
                                <button class="modal-close-button" @click="closeModal">X</button>
                            </slot>
                        </div>
                        <div class="modal-body">
                            <slot name="body">
                                <p>
                                    To sign in Janus it is necessary create a decentralized identity.
                                </p>
                            </slot>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="modal-button civic logo-civic" @click="handleCivic" v-bind:class="{'button-disabled': disableCivic}">
                                    Connect with Civic
                                </button>
                                <button class="modal-button metamask logo-metamask" @click="handleMetaMask" v-bind:class="{'button-disabled': disableMetamask}">
                                  Connect with MetaMask
                                </button>
                                <div class="modal-error-message" v-if="showError">
                                    <p>Não foi possivel efetuar o acesso, tente novamente mais tarde.</p>
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
import axios from 'axios'

export default {
  name: 'Modal',
  components: {},
  methods: {
    closeModal: function () {
      this.showModal = false
    },
    openModal: function () {
      this.showModal = true
    },
    handleMetaMask: function () {
      console.log('ok')
    },
    handleCivic: function () {
      /* global Civic */
      /* eslint no-undef: "error" */
      let civicSip = new Civic({appId: process.env.CIVICID})
      civicSip.signup({style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP})
      civicSip.on('auth-code-received', event => {
        if (event.response) {
          axios.post(process.env.IDENTITY_BASE_URL, {'token': event.response})
            .then((response) => {
              this.closeModal()
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
      disableCivic: process.env.DISABLE_IDENTITY_CIVIC,
      disableMetamask: process.env.DISABLE_IDENTITY_METAMASK
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
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
  width: 25vw;
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
  color: #3AB03E;
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

.modal-error-message {
    text-align: center;
    padding-top: 20px;
    color: #800000;
}

.modal-button {
  width: 240px;
  height: 44px;
  font-family:'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 16;
  font-weight: 700;
  color: #FFFFFF;
  border-radius: 33px;
  border: 0;
  border: none;
  padding: 0 5px 0 5px;
  cursor: pointer;
  margin-top: 5%;
}

.modal-button.civic {
  background: url("../assets/civic-logo.png")  no-repeat 15px center, #3AB03E;
  background-size: 23px;
}

.modal-button.metamask {
  background: url("../assets/metamask-logo.png")  no-repeat 15px center, #F79220;
  background-size: 23px;
}

.modal-button-metamask {
  width: 240px;
  height: 44px;
  font-family:'Montserrat', Helvetica, Arial, sans-serif;
  font-size: 16;
  font-weight: 700;
  background-color: #F79220;
  color: #FFFFFF;
  border-radius: 33px;
  border: 0;
  border: none;
  padding: 0 5px 0 5px;
  cursor: pointer;
  margin-top: 5%;
}

.modal-close-button {
  border: 0;
  background: none;
  box-shadow: none;
  border: none;
  padding: 0 8px 0 ;
  cursor: pointer;
  font-weight: 800;
  font-size: 12pt;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15%;
}

.button-disabled {
  background: silver !important;
}

</style>
