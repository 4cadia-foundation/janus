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
        <!-- <button class="btn btn--outline" @click="handleShowHashInput()">
          Do you have a indexed content hash?
        </button>
        <div class="form_field" v-if="this.showHashInput">
          <v-input
            placeholderTxt="e.g. QmTzX8TJe14i3ic6yAzuavNzx3WAz9UXSuFMX5qqbiMQSV"
            inputType="text"
            inputName="hash"
            inputLabel="Content Hash"
            v-model="hash"
            ref="inputHash"
          />
        </div> -->
        <div v-if="this.ipfsLinkHash.length > 0"> Access your content in: <a target="_blank" :href="`http://ipfs.caralabs.me/ipfs/${this.ipfsLinkHash[0]}`"> {{this.ipfsLinkHash[0]}}</a></div>
        <div class="form_control">
          <button type="submit" class="btn btn--alert" @click="reset()">Cancel</button>
          <button type="submit" class="btn btn--success" @click="save()"
            :title="(this.provider.accounts === undefined) ? 'You need to connect with Metamask' : 'Index here'">Index Content</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input'
import FileInput from '@/components/FileInput'
import Indexer from 'janusndxr'
import IndexRequest from 'janusndxr/dist/src/Domain/Entity/IndexRequest'
import { mapState } from 'vuex'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'FormIndexer',
  components: {
    'v-input': Input,
    'v-file-input': FileInput
  },
  data () {
    return {
      attemptSubmit: false,
      // hash: '',
      files: FileList,
      ipfsLinkHash: [],
      showHashInput: false,
      loader: {}
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
      account: state => state.web3.account,
      provider: state => state.web3.instance
    })
  },
  methods: {
    handleSubmit (e) {
      this.attemptSubmit = true
    },
    handleShowHashInput (e) {
      this.showHashInput = !this.showHashInput
    },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.files = []
      this.uploadError = null
      // this.hash = ''
      this.ipfsLinkHash = []
      this.$refs.inputFile.reset()
    },
    save () {
      this.ipfsLinkHash = []
      // this.hash = ''
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      if (this.provider.accounts === undefined) {
        this.$notification.error('You need to connect with Metamask')
        this.loader.hide()
        return
      }

      if (this.files.length === 0 && this.hash === '') {
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
      } else {
        indexRequest.Content = this.hash
        indexRequest.ContentType = 'hash'
      }

      let indexer = new Indexer(this.provider.web3().currentProvider)
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
              this.$notification.success(`Access your content in: http://ipfs.caralabs.me/ipfs/${this.ipfsLinkHash[0]}`, {infiniteTimer: true})
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
  }
}
</script>

<style scoped>
.content {
  max-width: 1024px;
  margin: auto;
}
.form {
  max-width: 60%;
  margin: 0 auto 100px;
}
.form_field {
  position: relative;
}
.form_control {
  text-align: right;
  margin-top: 30px;
}
.separator::before,
.separator::after {
  content: '';
  height: 1px;
  width: 40%;
  display: inline-block;
  background-color: var(--color-gray);
  position: relative;
  margin: 0 5px;
  vertical-align: middle;
}
.alert {
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all ease-in-out .5s;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.alert-success {
  color: #1c7223;
  background-color: #d7f8dd;
  border-color: #c6f5ca;
}
.alert-link {
  font-weight: 700;
  color: #491217;
}
.invisible {
  opacity: 0;
  padding: 0;
  font-size: 0;
}
.close {
  float: right;
  font-size: 16px;
  font-weight: 100%;
  line-height: 1;
  text-shadow: black;
  opacity: .5;
}
.close-danger{
  color: red;
}
.close.success{
  color: green;
}
button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
}
</style>
