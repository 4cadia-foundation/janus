<template>
  <div class="content">
    <form
      v-on:submit="validateForm"
      class="form">
      <div class="form-content col">
        <div class="form-field row">
            <input
              type="text"
              class="form-control input-search"
              v-model="searchInput"
              :placeholder="placeholder"
              v-bind:class="{ 'is-invalid': attemptSubmit && searchIsEmpty }"
            >
            <v-button/>
        </div>
      </div>
    </form>
    <div v-if="hasExceptions" class="errors">
      <ul class="errors-list">
        <li v-for="(exception, index) in this.exceptions" :key="index">{{ exception }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonSearch from '@/components/ButtonSearch'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'FormSearch',
  components: {
    'v-button': ButtonSearch
  },
  data () {
    return {
      placeholder: 'Search something on Janus...',
      searchInput: '',
      attemptSubmit: false,
      exceptions: []
    }
  },
  computed: {
    ...mapState({
      searchState: state => state.form.search
    }),
    // Mounts the "getSearch" getter to the scope of your component.
    ...mapGetters('validation', [
      'getExceptionByType'
    ]),
    searchIsEmpty: function () {
      return this.searchInput === ''
    },
    hasExceptions: function () {
      return this.exceptions.length > 0
    },
    fieldIsEmpty: function () {
      return this.getExceptionByType('Empty Field')
    }
  },
  methods: {
    handleSubmit: function (e) {
      this.$store.commit('form/updateForm', this.searchValue)
    },
    validateForm: function (e) {
      this.attemptSubmit = true
      if (this.searchIsEmpty) {
        this.exceptions.push(this.fieldIsEmpty)
      } else {
        this.handleSubmit()
      }
    }
  },
  mounted () {
  }
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
