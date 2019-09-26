<template>
  <div class="field_content">
    <div class="content--file">
      <p class="file_icon" :class="'file_icon--' + this.currentStatus"></p>
      <label :for="inputName" class="field_label">{{ uploadMessage }}</label>
      <input
        type="file"
        :class="`field ${this.isValid}`"
        :name="inputName"
        @input="$emit('input', $event.target.files)"
        v-on:change="handleUpload($event.target.files)"
        :accept="this.accept"
      />
      <p class="separator">or click to choose a file</p>
      <button type="button" class="btn">Browse File</button>
    </div>
    <div class="errors">
      <li v-for="(exception, index) in this.exceptions" :key="index">
        <p v-if="exception.show">{{ exception.message }}</p>
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const STATUS_INITIAL = 'initial'
const STATUS_SAVING = 'saving'
const STATUS_SUCCESS = 'success'
const STATUS_FAILED = 'failed'

export default {
  name: 'FileInput',
  components: {},
  data () {
    return {
      exceptions: [],
      isValid: this.hasExceptions ? 'invalid' : '',
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      filename: ''
    }
  },
  computed: {
    ...mapGetters('validation', ['getExceptionByType']),
    hasExceptions: function () {
      return (
        this.exceptions.filter(exception => exception.show === true).length > 0
      )
    },
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
    uploadMessage () {
      let message = 'Drag your ZIP file here'
      if (this.isSaving) message = 'Uploading ' + this.filename
      return message
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.uploadedFiles = []
      this.uploadError = null
      this.filename = ''
      this.currentStatus = STATUS_INITIAL
    },
    handleUpload: function (files) {
      this.filename = files[0].name
      this.currentStatus = STATUS_SAVING
      this.fieldIsValid(this.isEmpty(this.filename), 'EmptyField')

      if (typeof this.handleChange === 'function') {
        this.handleChange(files)
      }
    },
    fieldIsValid: function (exception, type) {
      let exceptionType = this.filterExceptionByType(type)
      if (exception) {
        exceptionType['0'].show = true
      } else {
        exceptionType['0'].show = false
      }
    },
    filterExceptionByType: function (exceptionType) {
      return this.exceptions.filter(
        exception => exception.type === exceptionType
      )
    },
    isEmpty: function (value) {
      return value === '' || value == null
    }
  },
  props: {
    inputName: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: false
    },
    handleChange: {
      type: Function,
      required: false
    }
  },
  mounted () {
    this.reset()
    this.exceptions.push(
      {
        type: 'EmptyField',
        message: this.getExceptionByType('EmptyField'),
        show: false
      },
      {
        type: 'InvalidField',
        message: this.getExceptionByType('InvalidField'),
        show: false
      }
    )
  }
}
</script>

<style scoped>
.field_content {
  position: relative;
  text-align: left;
  /* margin: 20px auto; */
  color: var(--color-white);
}
.field_label {
  display: block;
  width: 100%;
  text-align: center;
  color: var(--color-navy);
  font-size: 1.563em;
  margin-top: 30px;
}
.field {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--color-white);
  height: 3rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  font-size: 1rem;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-radius: 4px;
  box-sizing: border-box;
}
.field:hover,
.field.active {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px;
}
.field:focus {
  outline: none;
  border-color: var(--color-blue);
}
.field.invalid {
  border-color: var(--color-red);
}
.content--file {
  padding: 60px 0;
  position: relative;
  cursor: pointer;
  margin: auto;
  text-align: center;
}
.content--file .field {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  top: 0%;
  right: 0%;
  padding: 0;
  z-index: 1;
}
.content--file .separator {
  margin: 10px 0 30px;
  color: var(--color-navy);
}
.file_icon {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto 10px;
  background-size: contain;
  background-repeat: no-repeat;
  text-align: center;
}
.file_icon--initial {
  background-image: url('../assets/images/upload.svg');
}
.file_icon--success,
.file_icon--saving {
  background-image: url('../assets/images/upload-success.svg');
}
</style>
