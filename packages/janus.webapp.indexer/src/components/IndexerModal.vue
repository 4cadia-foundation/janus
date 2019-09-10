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
        <div class="modal-content">
          <div class="modal-row">
            <h4>Title: </h4>
            <v-input
              placeholderTxt="eg.: QmYbs8fHzYaXufL5gMyWB1XgnvbLRSqv9bb58LJHX3ziVv"
              inputType="text"
              inputName="Title"
              v-model="titleInput"
              :required="true"
              :alphaNumeric="true"
              ref="titleInput"
            />
          </div>
          <div class="modal-row">
            <h4>Description: </h4>
            <v-input
              placeholderTxt="eg.: QmYbs8fHzYaXufL5gMyWB1XgnvbLRSqv9bb58LJHX3ziVv"
              inputType="text"
              inputName="Description"
              v-model="descriptionInput"
              :required="true"
              :alphaNumeric="true"
              ref="descriptionInput"
            />
          </div>
          <div class="modal-row">
            <h4>Tags: </h4>
            <v-input
              placeholderTxt="eg.: QmYbs8fHzYaXufL5gMyWB1XgnvbLRSqv9bb58LJHX3ziVv"
              inputType="textarea"
              inputName="Tags"
              v-model="tagsInput"
              :required="true"
              :alphaNumeric="true"
              ref="tagsInput"
            />
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
      titleInput: '',
      descriptionInput: '',
      tagsInput: ''
    }
  },
  components: {
    'v-modal': BaseModal,
    'v-input': Input
  },
  props: {
  },
  methods: {
    openModal: function () {
      console.log('Open')
      this.$refs.modal.openModal()
    },
    handleConfirm: function () {
      console.log('Confirm')
      this.indexContent(this.titleInput, this.descriptionInput, this.tagsInput)
    },
    indexContent (titleInput, descriptionInput, tagsInput) {
      console.log('titleInput', titleInput)
      console.log('descriptionInput', descriptionInput)
      console.log('tagsInput', tagsInput)

      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      this.$store.getters.jnsInstance().BuyDomain(titleInput, descriptionInput, tagsInput)
        .then(newDomain => {
          if (newDomain.Success && newDomain.Result[0].event === 'DomainRegistered') {
            console.log('sucesso')
          }
          // this.$refs.modalDomain.openModalDomain()
        })
        .catch(err => this.$notification.error(err))
        .finally(() => this.loader.hide())
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
