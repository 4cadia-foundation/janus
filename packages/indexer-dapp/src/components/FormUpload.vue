<template>
  <div class="content">
    <form @submit.prevent="handleSubmit" class="form" ref="formContainer">
      <div class="form_content">
        <div class="form_field">
          <v-file-input
            v-model="files"
            :handleChange="handleSelectFile"
            inputName="file"
            ref="inputFile"
            accept=".zip"
          />
        </div>
        <div class="form_card">
          <v-indexer-card
            :data="cardData"
            v-if="isReadyToSubmit"
            :title="fileName"
            @handleActionRemove="reset"
          />
        </div>
        <div class="form_message" v-if="this.ipfsLinkHash.length > 0">
          <h4 class="highlight">
            Access your content in:
            <a
              target="_blank"
              :href="`http://ipfs.4cadia.com/ipfs/${this.ipfsLinkHash[0]}`"
            >
              {{ this.ipfsLinkHash[0] }}</a
            >
          </h4>
        </div>
        <div class="form_control">
          <p class="highlight" v-if="this.account === undefined">
            {{ this.getExceptionByType('NoMetamask') }}
          </p>
          <button
            type="submit"
            :class="['btn', isReadyToSubmit ? 'btn--success' : 'btn--disabled']"
            :disabled="!isReadyToSubmit"
            v-if="isReadyToSubmit"
            @click="save()"
            title="Index Content"
          >
            {{ this.account ? 'Index Content' : 'Please sign in first' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import IndexRequest from '@4cadia/janus-indexer-core/dist/Domain/Entity/IndexRequest'
import ResumeIndexRequest from '@4cadia/janus-indexer-core/dist/Domain/Entity/ResumeIndexRequest'
import { Indexer, Spider } from '@4cadia/janus-indexer-core'
import { withLoading } from '@/utils/decorators'
import { decorateMethods } from '@/utils/decorators/helpers'
import Input from '@/components/Input'
import FileInput from '@/components/FileInput'
import IndexerCard from '@/components/IndexerCard'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

const attachLoadingBehavior = decorateMethods(withLoading, [
  'save',
  'upload',
  'extractResume'
])

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
      resume: {
        type: ResumeIndexRequest
      },
      files: [],
      fileName: '',
      isValidFile: false,
      ipfsLinkHash: [],
      loader: {},
      isUploading: false,
      cardData: {
        title: '',
        description: '',
        tags: ''
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
    isReadyToSubmit () {
      return this.account && this.isValidFile
    },
    ...mapState({
      account: state => state.web3.address,
      instance: state => state.web3.instance()
    }),
    ...mapGetters('validation', ['getExceptionByType'])
  },
  methods: attachLoadingBehavior({
    getOptions () {
      let options = {
        contractAddress: localStorage.getItem('contractAddress'),
        contractAbi: localStorage.getItem('contractAbi'),
        ipfsHost: localStorage.getItem('ipfsHost')
      }

      options = Object.entries(options).reduce(
        (acc, [key, value]) =>
          value ? Object.assign(acc, { [key]: value }) : acc,
        {}
      )

      if (options.contractAbi) {
        options.contractAbi = JSON.parse(options.contractAbi)
      }

      return options
    },
    handleSelectFile (files) {
      if (files[0]) {
        this.fileName = files[0].name
        this.extractResume()
      }
    },
    handleSubmit (e) {
      this.attemptSubmit = true
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

      if (this.account === undefined) {
        this.$notification.error(this.getExceptionByType('NoMetamask'))
        return
      }

      if (this.files.length === 0) {
        this.currentStatus = STATUS_FAILED
        this.$notification.error(this.getExceptionByType('EmptyFile'))
        return
      }

      // upload data to the server
      this.currentStatus = STATUS_SAVING
      this.upload()
    },
    async extractResume () {
      let indexRequest = new IndexRequest()

      if (this.files.length > 0) {
        indexRequest.Content = this.files[0]
        indexRequest.ContentType = 'zip'
      } else {
        this.currentStatus = STATUS_FAILED
        this.$notification.error(this.getExceptionByType('EmptyFile'))
        return
      }

      let options = this.getOptions()
      let spider = new Spider(null, options)

      try {
        const resumeIndexRequest = await spider.extractMetadataContent(
          indexRequest
        )

        this.cardData = resumeIndexRequest.metadata
        this.resume = resumeIndexRequest
        this.isValidFile = true
      } catch (err) {
        this.$notification.error(err.message)
        this.isValidFile = false
      }
    },
    async upload () {
      let options = this.getOptions()
      let spider = new Spider(null, options)

      let indexRequest = {}

      if (this.files.length > 0) {
        indexRequest.Content = this.files[0]
        indexRequest.ContentType = 'zip'
      } else {
        this.currentStatus = STATUS_FAILED
        this.$notification.error(this.getExceptionByType('EmptyFile'))
        return
      }

      const indexResult = await new Promise(resolve => {
        spider.addContent(indexRequest, indexResult => resolve(indexResult))
      })

      if (indexResult.Success) {
        let indexedFile =
          indexResult.IndexedFiles.find(file =>
            file.FileName.endsWith('index.html')
          ) || indexResult.IndexedFiles[0]

        this.ipfsLinkHash = [indexedFile.IpfsHash]

        indexedFile.HtmlData = {
          Tags: this.resume.metadata.tags,
          Title: this.resume.metadata.title,
          Description: this.resume.metadata.description
        }

        let indexer = new Indexer(this.instance.currentProvider, options)
        let indexedFileResult = await indexer.addWebsite(indexedFile)
        if (indexedFileResult.Success) {
          this.$notification.success(
            'Success! Thank you for contributing with your content!'
          )
        } else {
          this.$notification.warning(
            'Your content was uploaded successfuly, but could not be indexed!'
          )
        }
      } else {
        for (let index = 0; index < indexResult.Errors.length; index++) {
          const error = indexResult.Errors[index]
          this.$notification.error(error)
        }
      }
    }
  }),
  mounted () {
    this.reset()
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
  transition: 0.2s all linear;
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
