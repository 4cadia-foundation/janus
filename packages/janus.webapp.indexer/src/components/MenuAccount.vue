<template>
  <div class="account">
    <v-dropdown ref="dropdown" :authenticated="isAuthenticated"></v-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DropdownBtn from '@/components/DropdownBtn'

export default {
  name: 'MenuAccount',
  components: {
    'v-dropdown': DropdownBtn
  },
  computed: {
    ...mapState({
      activeAccount: state => state.web3.account,
      isAuthenticated: state => state.profile.authenticated
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

/* Media Mobile */
@media (max-width: 768px) {
  .account {
    display: block;
  }
}
</style>
