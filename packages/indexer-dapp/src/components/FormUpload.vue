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
          <v-indexer-card
            :data="cardData"
            v-if="files.length > 0"
            :title="fileName"
            v-on:handleActionRemove="reset"
          />
        </div>
        <div class="form_message" v-if="this.ipfsLinkHash.length > 0">
          <h4 class="highlight">
            Access your content in:
            <a
              target="_blank"
              :href="`http://ipfs.caralabs.me/ipfs/${this.ipfsLinkHash[0]}`"
            >
              {{ this.ipfsLinkHash[0] }}</a
            >
          </h4>
        </div>
        <div class="form_control">
          <p class="highlight" v-if="this.account === undefined">
            {{ this.getExceptionByType("NoMetamask") }}
          </p>
          <button
            type="submit"
            :class="`btn btn--success`"
            v-if="files.length > 0"
            @click="save()"
            title="Index Content"
          >
            Index Content
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input'
import FileInput from '@/components/FileInput'
import IndexerCard from '@/components/IndexerCard'
import { Indexer, Spider } from '@4cadia/janus-indexer-core'
import { mapState, mapGetters } from 'vuex'
import IndexRequest from '@4cadia/janus-indexer-core/dist/Domain/Entity/IndexRequest'
import ResumeIndexRequest from '@4cadia/janus-indexer-core/dist/Domain/Entity/ResumeIndexRequest'

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
      resume: {
        type: ResumeIndexRequest
      },
      files: [],
      fileName: '',
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
    ...mapState({
      account: state => state.web3.address,
      instance: state => state.web3.instance()
    }),
    ...mapGetters('validation', ['getExceptionByType'])
  },
  methods: {
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
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      this.ipfsLinkHash = []

      if (this.account === undefined) {
        this.$notification.error(this.getExceptionByType('NoMetamask'))
        this.loader.hide()
        return
      }

      if (this.files.length === 0) {
        this.currentStatus = STATUS_FAILED
        this.$notification.error(this.getExceptionByType('EmptyFile'))
        this.loader.hide()
        return
      }
      // upload data to the server
      this.currentStatus = STATUS_SAVING
      this.loader.hide()
      this.upload()
    },
    extractResume () {
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      let indexRequest = new IndexRequest()

      if (this.files.length > 0) {
        indexRequest.Content = this.files[0]
        indexRequest.ContentType = 'zip'
      } else {
        this.currentStatus = STATUS_FAILED
        this.$notification.error(this.getExceptionByType('EmptyFile'))
        this.loader.hide()
        return
      }

      let options = this.getOptions()
      let spider = new Spider(null, options)
      spider
        .ExtractMetadataContent(indexRequest)
        .then(resumeIndexRequest => {
          this.cardData = resumeIndexRequest.metadata
          this.resume = resumeIndexRequest
          this.loader.hide()
        })
        .finally(() => this.loader.hide())
    },
    upload () {
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      let options = this.getOptions()
      let spider = new Spider(null, options)

      let indexRequest = {}

      if (this.files.length > 0) {
        indexRequest.Content = this.files[0]
        indexRequest.ContentType = 'zip'
      } else {
        this.currentStatus = STATUS_FAILED
        this.$notification.error(this.getExceptionByType('EmptyFile'))
        this.loader.hide()
        return
      }

      spider.AddContent(indexRequest, indexResult => {
        this.loader.hide()
        if (indexResult.Success) {
          let indexedFile =
            indexResult.IndexedFiles.find(
              file => file.FileName === 'index.html'
            ) || indexResult.IndexedFile[0]

          this.ipfsLinkHash = [indexedFile.IpfsHash]

          let htmlData = {}
          htmlData.Tags = this.resume.metadata.tags
          htmlData.Title = this.resume.metadata.title
          htmlData.Description = this.resume.metadata.description
          indexedFile.HtmlData = htmlData

          let indexer = new Indexer(this.instance.currentProvider, options)
          indexer
            .AddNewWebsite(indexedFile)
            .then(indexedFileResult => {
              if (indexedFileResult.Success) {
                this.$notification.success(
                  'Success! Thank you for contributing with your content!'
                )
              } else {
                this.$notification.warning('Your content was uploaded successfuly, but could not be indexed!')
              }
            })
            .finally(() => this.loader.hide())
        } else {
          for (let index = 0; index < indexResult.Errors.length; index++) {
            const error = indexResult.Errors[index]
            this.$notification.error(error)
          }
          this.loader.hide()
        }
      })
    }
  },
  mounted () {
    this.reset()
  },
  watch: {
    files: function (newVal, oldVal) {
      if (newVal[0]) {
        this.fileName = newVal[0].name
        this.extractResume()
      }
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
