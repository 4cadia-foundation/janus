<template>
  <div class="field_content">
    <div class="field_group">
      <label :for="inputName" v-if="inputLabel">{{ inputLabel }}</label>
      <input
        class="field"
        ref="input"
        :type="inputType"
        :name="inputName"
        :placeholder="placeholderTxt"
        :value="value"
        @input="$emit('input', $event.target.value)"
        v-on:keyup="handleKeyUp"
        v-bind:class="{ 'invalid': this.hasExceptions }"
      >
      <slot></slot>
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

export default {
  name: 'Input',
  components: {
  },
  data () {
    return {
      exceptions: []
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
    blur: function () {
      this.$refs.input.blur()
    },
    handleKeyUp: function (event) {
      if (this.required) this.fieldIsValid(this.isEmpty(this.value), 'EmptyField')
      if (this.alphaNumeric) this.fieldIsValid(!this.isAlphaNumeric(this.value), 'InvalidField')
    },
    handleValidate: function (event) {
      this.handleKeyUp()
      return !this.hasExceptions
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
    inputLabel: {
      type: String
    },
    inputType: {
      type: String
    },
    inputName: {
      type: String
    },
    value: {
      type: String
    },
    required: {
      type: Boolean
    },
    alphaNumeric: {
      type: Boolean
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
.field_group {
  position: relative;
}
.field {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 16px;
  padding-right: 16px;
  color: var(--color-gray);
  background-color: var(--color-white);
  height: 60px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 6px;
  font-size: 1rem;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: var(--color-gray-lighter);
  border-radius: 4px;
  box-sizing: border-box;
}
.field:hover {
  box-shadow: rgba(27, 26, 27, 0.65) 0px 2px 6px;
}
.field:focus {
  outline: none;
  border-color: var(--color-primary);
}
.submited .errors {
  max-width: 80%;
  margin: 10px auto 0;
  text-align: right;
}
.submited .field_group {
  padding: 0 10%;
  background: var(--color-primary);
}
.submited .field {
  transition: all linear .5s;
  box-shadow: none;
  width: 100%;
  font-size: 25px;
  height: 60px;
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0;
}
/* Chrome, Firefox, Opera, Safari 10.1+ */
.submited .field::placeholder {
  color: white;
  opacity: 1;
}
/* Internet Explorer 10-11 */
.submited .field:-ms-input-placeholder {
  color: white;
}
/* Microsoft Edge */
.submited .field::-ms-input-placeholder {
  color: white;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  border: 1px solid var(--color-gray);
  -webkit-text-fill-color: var(--color-white);
  -webkit-box-shadow: 0 0 0 1000px var(--color-primary) inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
