<template>
  <div class="content">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form_content">
        <div class="form_field">
          <v-input
            placeholderTxt="Type something to search..."
            inputType="text"
            inputName="search"
            v-model="search"
            :required="true"
            :alphaNumeric="false"
            ref="searchInput"
          >
            <v-button/>
          </v-input>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input'
import ButtonSearch from '@/components/ButtonSearch'

export default {
  name: 'FormSearch',
  components: {
    'v-input': Input,
    'v-button': ButtonSearch
  },
  data () {
    return {
      attemptSubmit: false,
      exceptions: [],
      search: ''
    }
  },
  computed: {
    hasExceptions: function () {
      return this.exceptions.length > 0
    }
  },
  methods: {
    handleSubmit: function (e) {
      this.attemptSubmit = true
      let isValid = this.$refs.searchInput.handleValidate()
      if (!isValid) {
        this.$store.commit('search/updateSearch', this.search)
        this.$root.$emit('formSubmit')
      }
    }
  },
  mounted () {
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
  margin: auto;
}
.form_field {
  position: relative;
}
.submited .content,
.submited .form {
  max-width: 100%;
  transition: all linear .5s;
}
</style>
