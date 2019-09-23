<template>
  <div class="content">
    <form @submit.prevent="persist" class="form form--settings">
      <div class="form_field">
        <v-input
        placeholderTxt='Enter a point to IPFS'
        inputType="text"
        inputName="ipfsHost"
        inputLabel="Point to IPFS"
        :required="true"
        v-model="ipfsHost"
        />
      </div>
      <div class="form_field">
        <v-input
        placeholderTxt='e.g: 0x0000000000000000000000000000000000000000'
        inputType="text"
        inputName="contractAddress"
        inputLabel="Smart Contract Address"
        minlength="42"
        maxlength="46"
        :alphaNumeric="true"
        v-model="contractAddress"
        />
      </div>
      <div class="form_field">
        <v-input
        placeholderTxt='Enter a Smart Contract ABI'
        inputType="textarea"
        inputName="contractAbi"
        inputLabel="Smart Contract ABI"
        textareaRows="40"
        :required="true"
        v-model="contractAbi"
        />
      </div>
      <div class="form_control">
        <button type="submit" class="btn btn--success">Save Configs</button>
        <button type="reset" class="btn btn--alert" @click.prevent="reset()">Reset to default</button>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input'
import { Indexer } from '@4cadia/janus-indexer-core'
import LocalStorage from '../utils/localStorage'

export default {
  name: 'FormSettings',
  components: {
    'v-input': Input
  },
  data () {
    return {
      ipfsHost: LocalStorage.getItem('ipfsHost'),
      contractAddress: LocalStorage.getItem('contractAddress'),
      contractAbi: LocalStorage.getItem('contractAbi'),
      atemptSubmit: false
    }
  },
  methods: {
    reset () {
      let configs = Indexer.GetDefaultConfigs()

      this.ipfsHost = configs.ipfsHost
      this.contractAddress = configs.contractAddress
      this.contractAbi = JSON.stringify(configs.contractAbi, null, 1)
      this.$notification.warning(`Reset Succefully! Please click on save to persist your infos!`)
    },
    persist () {
      LocalStorage.setItem('ipfsHost', this.ipfsHost)
      LocalStorage.setItem('contractAddress', this.contractAddress)
      LocalStorage.setItem('contractAbi', this.contractAbi)
      this.$notification.success(`Success! You can now index your content with this custom configuration`)
    }
  }
}
</script>

<style scoped>
.form--settings {
  width: 80%;
  margin: auto;
  padding: 2%  0 5% 0;
}
.form_control .btn {
  margin: 20px 15px 0 15px;
}
</style>
