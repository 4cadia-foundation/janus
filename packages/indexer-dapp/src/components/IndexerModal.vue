<template>
  <div class="action-modal">
    <v-modal ref="modal">
      <template v-slot:header>
        <h3> You are almost done </h3>
      </template>

      <template v-slot:body>
        <div class="modal-subtitle">
          <p>To finish the transaction, please check the informations above to ensure all itens are completed.</p>
        </div>
        <div class="modal-content" v-for="(propValue, propName) in modalData" :key="propName">
          <div v-if="propValue" class="modal-row">
            <h4>{{ propName }}: </h4>
            <p>{{ propValue }}</p>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <button class="btn btn--success btn-confirm" @click="handleConfirm">Confirm Transaction</button>
      </template>
    </v-modal>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal'
import Input from '@/components/Input'

export default {
  name: 'IndexerModal',
  extends: BaseModal,
  data () {
    return {
    }
  },
  components: {
    'v-modal': BaseModal,
    'v-input': Input
  },
  props: {
    modalData: {
      type: Object
    }
  },
  methods: {
    openIndexerModal: function () {
      console.log('Open')
      this.$refs.modal.openModal()
    },
    closeIndexerModal: function () {
      console.log('Close')
      this.$refs.modal.closeModal()
    },
    handleConfirm: function () {
      console.log('Confirm')
      this.$emit('handleConfirm', this.modalData)
    }
  },
  mounted: function () {
  }
}
</script>

<style>
  .action-modal .modal-container {
    width: 50vw;
    color: black;
  }
  .action-modal .modal-content .modal-row {
    text-align: left;
    margin: 20px auto auto 20px;
  }
  .action-modal .modal-content .modal-row h4 {
    margin: auto;
  }
  .action-modal .modal-row .row-wrapper {
    margin: 10px 0;
  }
  .action-modal .modal-row .row-content {
    display: inline-block;
    vertical-align: middle;
  }
</style>
