<template>
  <div class="content">
    <form @submit.prevent="handleSubmit" class="form" ref="formContainer">
      <div class="form_content">
        <div class="form_field">
          <v-file-input
            inputName="file"
            v-model="files"
            ref="inputFile"
            accept=".zip"
          />
        </div>
        <div class="form_card">
          <v-indexer-card :data="cardData" v-if="files.length > 0" :title="fileName" v-on:handleAction="handleCardAction"/>
        </div>
        <div class="form_message" v-if="this.ipfsLinkHash.length > 0"> <h4 class="highlight">Access your content in: <a target="_blank" :href="`http://ipfs.caralabs.me/ipfs/${this.ipfsLinkHash[0]}`"> {{this.ipfsLinkHash[0]}}</a></h4></div>
        <div class="form_control">
          <button type="submit" class="btn btn--success" @click="save()"
            :title="(this.account === undefined) ? 'You need to connect with Metamask' : 'Index here'">Index Content</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input'
import FileInput from '@/components/FileInput'
import IndexerCard from '@/components/IndexerCard'
import Indexer from 'janusndxr-demo'
import IndexRequest from 'janusndxr-demo/dist/src/Domain/Entity/IndexRequest'
import { mapState } from 'vuex'
import config from '../../static/content/configDefault.json'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'FormIndexer',
  components: {
    'v-input': Input,
    'v-file-input': FileInput,
    'v-indexer-card': IndexerCard
  },
  data () {
    return {
      attemptSubmit: false,
      files: FileList,
      fileName: '',
      ipfsLinkHash: [],
      loader: {},
      isUploading: false,
      cardData: {
        'title': '',
        'description': '',
        'tags': ''
      }
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    },
    ...mapState({
      account: state => state.web3.address,
      instance: state => state.web3.instance()
    })
  },
  methods: {
    handleSubmit (e) {
      this.attemptSubmit = true
    },
    handleCardAction (action) {
      if (action === 'remove') {
        this.reset()
      } else {
        this.cardData = {
          'title': 'This is a Title',
          'description': 'This is a Description',
          'tags': 'Tag1, Tag2, Tag3'
        }
      }
    },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.files = {}
      this.uploadError = null
      this.ipfsLinkHash = []
      this.$refs.inputFile.reset()
    },
    save () {
      this.ipfsLinkHash = []
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      if (this.account === undefined) {
        this.$notification.error('You need to connect with Metamask')
        this.loader.hide()
        return
      }

      if (this.files.length === 0) {
        this.currentStatus = STATUS_FAILED
        this.$notification.error('Zip file or Content Hash must be filled!')
        this.loader.hide()
        return
      }
      // upload data to the server
      this.currentStatus = STATUS_SAVING
      this.upload()
    },
    upload () {
      let indexRequest = new IndexRequest()
      indexRequest.Address = this.account
      if (this.files.length > 0) {
        indexRequest.Content = this.files[0]
        indexRequest.ContentType = 'zip'
      }

      let indexer

      if (localStorage.getItem('IpfsRpcHost') === null && localStorage.getItem('indexerSmAddress') === null && localStorage.getItem('EthereumRpcHost') === null && localStorage.getItem('indexerSmAbi') === null) {
        indexer = new Indexer(this.instance.currentProvider, config.IpfsRpcHost, config.indexerSmAddress, config.EthereumRpcHost, config.indexerSmAbi)
      } else {
        indexer = new Indexer(this.instance.currentProvider, localStorage.IpfsRpcHost, localStorage.indexerSmAddress, localStorage.EthereumRpcHost, localStorage.indexerSmAbi)
      }

      indexer.AddContent(indexRequest, indexResult => {
        this.loader.hide()
        if (indexResult.Success) {
          let warnings = []
          for (let index = 0; index < indexResult.IndexedFiles.length; index++) {
            const file = indexResult.IndexedFiles[index]
            this.ipfsLinkHash.push(file.IpfsHash)
            if (file.Errors.length > 0) {
              for (let index = 0; index < file.Errors.length; index++) {
                const error = file.Errors[index]
                warnings.push(error)
              }
            } else {
              this.$notification.success(`Success! Thank you for contributing with your content!`)
              this.$notification.success(`Access your content in: http://ipfs.4cadia.com/ipfs/${this.ipfsLinkHash[0]}`, {infiniteTimer: true})
            }
          }
          if (warnings.length > 0) {
            const wrngs = warnings.reduce(function (acc, curr) {
              typeof acc[curr] === 'undefined' ? acc[curr] = 1 : acc[curr] += 1
              return acc
            }, {})
            for (var warning in wrngs) {
              this.$notification.warning(`${wrngs[warning]} warning(s) were encountered while indexing your file. Fields: ${warning}`)
            }
          }
        } else {
          for (let index = 0; index < indexResult.Errors.length; index++) {
            const error = indexResult.Errors[index]
            this.$notification.error(error)
          }
        }
      })
    }
  },
  mounted () {
    this.reset()
  },
  watch: {
    files: function (newVal, oldVal) {
      this.fileName = newVal[0] ? newVal[0].name : ''
    }
  }
}
</script>

<style scoped>
.content {
  max-width: 1024px;
  margin: 0 auto 100px;
  padding-top: 60px;
}
.form_field {
  position: relative;
  height: 100%;
  background: white;
  border: 3px dashed var(--color-blue);
  border-radius: 20px;
  transition: .2s all linear;
  margin-bottom: 30px;
}
.form_field:hover {
  box-shadow: 0px 0px 50px 0px rgba(0, 156, 222, 0.38) inset;
}
.form_card {
  color: var(--color-black);
}
.form_control {
  text-align: right;
  margin-top: 30px;
}
.form_message {
  color: var(--color-navy);
}
</style>
