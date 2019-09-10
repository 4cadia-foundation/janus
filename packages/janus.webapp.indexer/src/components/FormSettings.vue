<template>
  <div class="content">
    <form @submit.prevent="handleSubmit" class="form form--settings">
      <div class="form_field">
        <v-input
        placeholderTxt='Enter a node'
        inputType="text"
        inputName="EthereumRpcHost"
        inputLabel="Node"
        :required="true"
        v-model="EthereumRpcHost"
        />
      </div>
      <div class="form_field">
        <v-input
        placeholderTxt='Enter a point to IPFS'
        inputType="text"
        inputName="IpfsRpcHost"
        inputLabel="Point to IPFS"
        :required="true"
        v-model="IpfsRpcHost"
        />
      </div>
      <div class="form_field">
        <v-input
        placeholderTxt='e.g: 0x0000000000000000000000000000000000000000'
        inputType="text"
        inputName="indexerSmAddress"
        inputLabel="Smart Contract Address"
        minlength="42"
        maxlength="46"
        :alphaNumeric="true"
        v-model="indexerSmAddress"
        />
      </div>
      <div class="form_field">
        <v-input
        placeholderTxt='Enter a Smart Contract ABI'
        inputType="textarea"
        inputName="indexerSmAbi"
        inputLabel="Smart Contract ABI"
        :required="true"
        v-model="indexerSmAbi"
        />
      </div>
      <div class="form_control">
        <button class="btn btn--alert" @click="reset()">Cancel</button>
        <button type="submit" class="btn btn--success" @click="persist()">Save</button>
        </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input'
import Config from '../../static/configs/configDefault.json'

export default {
  name: 'FormSettings',
  components: {
    'v-input': Input
  },
  data () {
    return {
      EthereumRpcHost: Config.EthereumRpcHost,
      IpfsRpcHost: Config.IpfsRpcHost,
      indexerSmAddress: Config.indexerSmAddress,
      indexerSmAbi: JSON.stringify(Config.indexerSmAbi, null, 1),
      atemptSubmit: false
    }
  },
  mounted () {
    if (localStorage.EthereumRpcHost) this.EthereumRpcHost = localStorage.EthereumRpcHost
    if (localStorage.IpfsRpcHost) this.IpfsRpcHost = localStorage.IpfsRpcHost
    if (localStorage.indexerSmAddress) this.indexerSmAddress = localStorage.indexerSmAddress
    if (localStorage.indexerSmAbi) this.indexerSmAbi = localStorage.indexerSmAbi
  },
  // watch: {
  //   EthereumRpcHost (newEthereumRpcHost) {
  //     localStorage.EthereumRpcHost = newEthereumRpcHost
  //   },
  //   IpfsRpcHost (newIpfsRpcHost) {
  //     localStorage.IpfsRpcHost = newIpfsRpcHost
  //   },
  //   indexerSmAddress (newindexerSmAddress) {
  //     localStorage.indexerSmAddress = newindexerSmAddress
  //   },
  //   indexerSmAbi (newindexerSmAbi) {
  //     localStorage.indexerSmAbi = newindexerSmAbi
  //   }
  // },
  methods: {
    reset () {
    // reset form to initial state
      this.EthereumRpcHost = Config.EthereumRpcHost
      this.IpfsRpcHost = Config.IpfsRpcHost
      this.indexerSmAddress = Config.indexerSmAddress
      this.indexerSmAbi = JSON.stringify(Config.indexerSmAbi, null, 1)
      localStorage.clear()
    },
    persist () {
      localStorage.EthereumRpcHost = this.EthereumRpcHost
      localStorage.IpfsRpcHost = this.IpfsRpcHost
      localStorage.indexerSmAddress = this.indexerSmAddress
      localStorage.indexerSmAbi = JSON.parse(this.indexerSmAbi)
      this.$notification.success(`Success! You can now index your content with this custom configuration`)
    }
  }
}
</script>

<style scoped>
.form--settings {
  width: 80%;
  margin: auto;
  padding-bottom: 20px;
}

</style>
