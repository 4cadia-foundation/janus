<template>
  <div class="content">
    <h3>Type something to test the Vuex Store</h3>
    <form
      v-on:submit="validateForm"
      class="form">
      <div class="form-content col">
        <div class="form-field row">
            <input
              type="text"
              class="input"
              v-model="vInput"
              :placeholder="placeholder"
              v-bind:class="{ 'is-invalid': attemptSubmit && inputIsEmpty }"
            >
        </div>
        <div v-if="hasExceptions" class="errors">
          <ul class="errors-list">
            <li v-for="(exception, index) in this.exceptions" :key="index">{{ exception }}</li>
          </ul>
        </div>
      </div>
      <button class="button" type="submit">Enviar</button>
    </form>
    <div class="return">
      <h3>Form Stored Values</h3>
      {{ this.getInput }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Form',
  components: {
  },
  data () {
    return {
      placeholder: 'Input Example',
      vInput: '',
      attemptSubmit: false,
      exceptions: []
    }
  },
  computed: {
    ...mapGetters('validation', [
      'getExceptionByType'
    ]),
    ...mapGetters('form', [
      'getInput'
    ]),
    inputIsEmpty: function () {
      return this.vInput === ''
    },
    hasExceptions: function () {
      return this.exceptions.length > 0
    },
    hasEmptyField: function () {
      return this.getExceptionByType('Empty Field')
    }
  },
  methods: {
    UserException (exception) {
      if (!this.hasExceptions) this.exceptions.push(exception)
      return exception
    },
    handleSubmit: function (e) {
      this.attemptSubmit = true
      if (this.hasExceptions) this.exceptions = []
      this.$store.commit('form/setInput', this.vInput)
    },
    validateForm: function (e) {
      try {
        if (this.inputIsEmpty) {
          throw this.UserException(this.hasEmptyField)
        }
        console.log('Form Enviado!')
        this.handleSubmit()
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.form {
  margin: 20px auto;
}
.input {
  padding-top: 0px;
  padding-left: 16px;
  color: #3f3d4b;
  background-color: rgb(255, 255, 255);
  height: 3rem;
  box-shadow: #0000001a 0px 2px 4px;
  font-size: 1rem;
  font-family: "Source Sans Pro", -apple-system, sans-serif;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: rgb(204, 204, 204);
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-radius: 16px;
}
.input.is-invalid {
  border-color: #dc3545;
}
.errors-list {
  text-align: left;
  padding: 0 0 0 5px;
  margin-top: 10px;
  font-size: .875rem;
  color: #dc3545;
}
.button {
  -webkit-appearance: none;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  box-shadow: none;
  color: #3f3d4b;
  cursor: pointer;
  display: inline-flex;
  font-size: 1rem;
  height: 2.25em;
  justify-content: center;
  line-height: 1.5;
  padding: calc(.375em - 1px) .75em;
  margin: .75em;
  position: relative;
  text-align: center;
  vertical-align: top;
  white-space: nowrap;
}
</style>
