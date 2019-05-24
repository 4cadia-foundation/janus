<template>
  <div class="field_content" :class="'content--' + this.inputType">
    <label :for="inputName" class="field_label">{{ inputLabel }}</label>
    <input
      class="field"
      :class="this.isValid"
      :type="inputType"
      :name="inputName"
      :placeholder="placeholderTxt"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-on:keyup="handleKeyUp"
    >
    <div class="errors">
      <li v-for="(exception, index) in this.exceptions" :key="index">
        <p v-if="exception.show"> {{ exception.message }} </p>
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Input',
  components: {
  },
  data () {
    return {
      exceptions: [],
      isValid: this.hasExceptions ? 'invalid' : ''
    }
  },
  computed: {
    ...mapGetters('validation', [
      'getExceptionByType'
    ]),
    hasExceptions: function () {
      return this.exceptions.filter(exception => exception.show === true).length > 0
    }
  },
  methods: {
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
    value: {
      type: String,
      required: true
    }
  },
  mounted () {
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
}
.field {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 16px;
  padding-right: 16px;
  color: var(--color-gray);
  background-color: rgb(255, 255, 255);
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
  border-color: var(--color-primary);
}
.field.invalid {
  border-color: var(--color-red);
  color: var(--color-red);
}
.content--file .field {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100px;
  position: absolute;
  cursor: pointer;
  top: 0%;
  right: 0%;
  padding: 0;
}
</style>
