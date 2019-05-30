<template>
  <div class="account">
    <label>{{activeAccount}}</label>
    <button type="submit" class="btn btn-primary" v-on:click="handleClick">
      <svg class="icon-account" title="Account" viewBox="0 0 24 24" width="64" height="64" fill="currentcolor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
        ></path>
        <path d="M0 0h24v24H0z" fill="none"></path>
      </svg>
    </button>
    <v-modal ref="modal"></v-modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import { mapState } from 'vuex'

export default {

  name: 'MenuAccount',
  components: {
    'v-modal': Modal
  },
  data () {
    return {
      // activeAccount: 'Active account does not exists'
    }
  },
  computed: mapState({
    activeAccount: state => state.web3.account
  }),
  methods: {
    handleClick: function (value) {
      this.$refs.modal.openModal()
    }
  },
  data: function () {
    return {
      enableIdentity: process.env.IDENTITY
    }
  }
}
</script>

<style scoped>
.account {
  text-align: right;
  -webkit-align-items: center;
  display: flex;
  align-items: center;
}

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

</style>
