<template>
  <div class="field_content">
    <div class="content--file">
      <p class="file_icon" :class="'file_icon--' + this.currentStatus"></p>
      <label :for="inputName" class="field_label">{{ uploadMessage }}</label>
      <input
        class="field"
        type="file"
        :class="this.isValid"
        :name="inputName"
        :inputValue="value"
        @input="$emit('input', $event.target.value)"
        v-on:keyup="handleKeyUp"
      >
      <p class="separator">or</p>
      <button type="button" class="btn btn--icon">Browse Files</button>
    </div>
    <div class="errors">
      <li v-for="(exception, index) in this.exceptions" :key="index">
        <p v-if="exception.show"> {{ exception.message }} </p>
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
  components: {
  },
  data () {
    return {
      exceptions: [],
      isValid: this.hasExceptions ? 'invalid' : '',
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null
    }
  },
  computed: {
    ...mapGetters('validation', [
      'getExceptionByType'
    ]),
    hasExceptions: function () {
      return this.exceptions.filter(exception => exception.show === true).length > 0
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
      let message = 'Drag your file(s) here'
      if (this.isSaving) message = 'Uploading ' + this.uploadedFiles.length + 'files...'
      return message
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    handleKeyUp: function (event) {
      this.fieldIsValid(this.isEmpty(this.value), 'EmptyField')
      this.fieldIsValid(!this.isAlphaNumeric(this.value), 'InvalidField')
    },
    handleValidate: function (event) {
      this.handleKeyUp()
      return this.hasExceptions
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
      return this.exceptions.filter(exception => exception.type === exceptionType)
    },
    isAlphaNumeric: function (value) {
      var re = /^[a-zA-Z0-9]+$/
      return value ? re.test(value) : true
    },
    isEmpty: function (value) {
      return value === '' || value == null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING
    }
  },
  props: {
    placeholderTxt: {
      type: String
    },
    inputType: {
      type: String,
      required: true
    },
    inputName: {
      type: String,
      required: true
    },
    inputLabel: {
      type: String
    },
    inputValue: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.reset()
    this.exceptions.push(
      {type: 'EmptyField', message: this.getExceptionByType('EmptyField'), show: false},
      {type: 'InvalidField', message: this.getExceptionByType('InvalidField'), show: false}
    )
  }
}
</script>

<style scoped>
.field_content {
  position: relative;
  text-align: left;
  margin: 20px auto;
}
.field_label {
  color: var(--color-gray);
  display: block;
  width: 100%;
  text-align: center;
}
.field {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 16px;
  padding-right: 16px;
  color: var(--color-gray);
  background-color: var(--color-white);
  height: 3rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  font-size: 1rem;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: var(--color-gray-lighter);
  border-radius: 4px;
  box-sizing: border-box;
}
.field:hover {
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
  color: var(--color-gray);
  padding: 30px 0;
  position: relative;
  cursor: pointer;
  margin: auto;
  border: 1px dashed var(--color-gray);
  border-radius: 10px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
}
.content--file .field {
  opacity: 0; /* invisible but it's there! */
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
  margin: 10px 0;
}
.content--file .separator::before,
.content--file .separator::after {
  content: '';
  height: 1px;
  width: 10%;
  display: inline-block;
  background-color: var(--color-gray);
  position: relative;
  margin: 0 5px;
  vertical-align: middle;
}
.file_icon {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto 10px;
  background-size: contain;
  background-repeat: no-repeat;
  text-align: center;
}
.file_icon--initial {
  background-image: url('../assets/icon-cloud-upload.svg');
}
.file_icon--success {
  background-image: url('../assets/icon-cloud-done.svg');
}
</style>
