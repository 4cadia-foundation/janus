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
                                <button class="modal-default-button" @click="handleCivic">
                                    <svg width="248px" height="45px" viewBox="0 0 256 48" version="1.1">
                                        <rect id="button-bg" fill="#3AB03E" x="0" y="0" width="256" height="48" rx="24"></rect>
                                             <text id="Connect-with-Civic" font-family="'Montserrat', Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">
                                                <tspan x="64.351" y="30">Connect with Civic</tspan>
                                             </text>
                                        <path d="M15,24 C15,28.7557705 18.8112793,33 24,33 C28.3410645,33 31.8986122,30.5324628 32.9909576,27 L36,27 C34.8386328,32.1411987 30.861084,36 24,36 C16.3657227,36 12,30.8982832 12,24.0000449 C12,17.1018066 16.3879395,12 24,12 C31.0664062,12 34.8386328,15.8588013 36,21 L32.9909576,21 C31.8986122,17.4674474 28.6115723,15 24,15 C18.4970703,15 15,19.2441397 15,24 Z M24,20 C25.6569,20 27,21.2859605 27,22.872371 C27,24.006383 25.9967,24.9866275 25,25.4535793 L25,29 L23,29 L23,25.4535793 C22.0032,24.9866275 21,24.006383 21,22.872371 C21,21.2859605 22.3432,20 24,20 Z" id="ICON" fill="#FFFFFE"></path>
                                    </svg>
                                </button>
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
    handleCivic: function () {
      let civicSip = new civic.sip({appId: '-uXno0-XF'})

      let exemplo = 'BASIC_SIGNUP'

      let options = civicSip.ScopeRequests[exemplo]

      civicSip.signup({style: 'popup', scopeRequest: options})
      // Listen for data
      civicSip.on('auth-code-received', function (event) {
        console.log(event)
        const data = {'token': event.response}
        axios.post(process.env.IDENTITY_BASE_URL, data)
          .then((response) => {
            console.log(response)
          })
      })
    }
  },

  data () {
    console.log(process.env)
    return {
      showModal: false
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
  height: 40vh;
  margin: 0 auto;
  padding: 2% ;
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

</style>
