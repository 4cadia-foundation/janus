<template>
  <div class="content">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-content col">
        <div class="form-field row">
          <input
            type="text"
            class="form-control input-search"
            name="search"
            v-model="searchInput"
            :placeholder="placeholder"
            v-on:blur="fieldIsEmpty"
            v-bind:class="{ 'is-invalid': attemptSubmit && this.isEmpty(this.searchInput) }"
          >
          <v-button/>
          <div class="errors">
            <li v-for="(exception, index) in this.exceptions.search" :key="index">
              {{ exception }}
            </li>
          </div>
        </div>
        <div class="form-field row">
          <input
            type="text"
            class="form-control input-search"
            name="teste"
            v-model="teste"
            :placeholder="'TESTE'"
            v-on:blur="fieldIsEmpty"
            v-bind:class="{ 'is-invalid': attemptSubmit && this.isEmpty(this.teste) }"
          >
          <v-button/>
          <!-- <div v-if="hasExceptions" class="errors">
            <v-error v-for="(exception, index) in this.exceptions[teste]" :key="index" :error="error"></v-error>
          </div> -->
        </div>
      </div>
    </form>
    <div>
      <v-search ref="searchResult"/>
    </div>
  </div>
</template>

<script>
import ButtonSearch from '@/components/ButtonSearch'
import { mapGetters } from 'vuex'
import SearchResult from '@/components/SearchResult'
import ItemError from '@/components/ItemError'

export default {
  name: 'FormSearch',
  components: {
    'v-button': ButtonSearch,
    'v-search': SearchResult,
    'v-error': ItemError
  },
  data () {
    return {
      placeholder: 'Search something on Janus...',
      searchInput: null,
      teste: null,
      attemptSubmit: false,
      exceptions: {
        search: [],
        teste: {}
      }
    }
  },
  computed: {
    ...mapGetters('validation', [
      'getExceptionByType'
    ]),
    hasExceptions: function () {
      // Verifique se eu tenho erros
      return this.exceptions.length > 0
    }
  },
  methods: {
    isEmpty (value) {
      // Verifique se o campo é vazio
      return value === '' || value == null
    },
    hasException: function (field, exceptionType) {
      // Verifique se eu tenho erros
      return this.exceptions[field].some(exception => exception[exceptionType])
    },
    getErrors: function (fieldName) {
      // Verifique se eu tenho erros
      // return this.exceptions.field.find(fieldName)
      return this.exceptions[fieldName]
    },
    fieldIsEmpty: function (e) {
      // O campo está vazio?
      console.log(this.exceptions.search)
      if (this.isEmpty(e.srcElement.value) && !this.hasException(e.srcElement.name, 'EmptyField')) {
        this.exceptions[e.srcElement.name].push({EmptyField: 'TEste'})
      }
      // else if (!this.hasException('EmptyField', e.srcElement.name)) {
      //   // Eu já mostrei esse erro antes?
      //   // Não
      //   this.exceptions.push({
      //     // Mostre o erro
      //     field: e.srcElement.name, type: 'EmptyField', message: this.getExceptionByType('Empty Field')
      //   })
      // }
    },
    validateForm: function (e) {
      // Diga que eu apertei o enter
      this.attemptSubmit = true
      // Eu tenho erros?
      console.log(this.exceptions)
    },
    handleSubmit: function (e) {
      // Valide meu form
      // this.validateForm()
      // Mande meu input pra store
      // this.$store.commit('search/updateSearch', this.searchInput)
      // Chame os resultados
      // this.$refs.searchResult.getResults()
    }
  },
  mounted () {}
}
</script>

<style scoped>
.input-search {
  border: none;
  border-radius: 16px;
}
.form-control {
  padding-top: 0px;
  padding-left: 16px;
  color: rgb(63, 61, 75);
  background-color: rgb(255, 255, 255);
  height: 3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
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
}
.form-control.is-invalid {
  border-color: #dc3545;
}
.errors-list {
  text-align: left;
  padding: 0 0 0 5px;
  margin-top: 10px;
  font-size: .875rem;
  color: #dc3545;
}
</style>
