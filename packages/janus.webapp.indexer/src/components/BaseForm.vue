<template>
  <div class="content">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form_content">
        <div class="form_field">
          <v-input
            placeholderTxt="e.g. 0xAc03BB73b6a9e108530AFf4Df5077c2B3D481e5A"
            inputType="text"
            inputName="address"
            inputLabel="Wallet Address"
            v-model="address"
            ref="inputAddress"
          />
        </div>
        <div class="form_field">
          <v-file-input
            inputName="file"
            v-model="file"
            ref="inputFile"
          />
        </div>
        <div class="form_field">
          <v-input
            placeholderTxt="e.g. file://index.html"
            inputType="text"
            inputName="folder"
            inputLabel="Folder Path"
            v-model="folder"
            ref="inputFolder"
          />
        </div>
        <div class="form_field">
          <v-input
            placeholderTxt="e.g. 0xAc03BB73b6a9e108530AFf4Df5077c2B3D481e5A"
            inputType="text"
            inputName="hash"
            inputLabel="Content Hash"
            v-model="hash"
            ref="inputHash"
          />
        </div>
        <div class="form_control">
          <button type="submit" class="btn btn--alert">Cancel</button>
          <button type="submit" class="btn btn--success">Index content</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Input from '@/components/Input'
import FileInput from '@/components/FileInput'

export default {
  name: 'FormSearch',
  components: {
    'v-input': Input,
    'v-file-input': FileInput
  },
  data () {
    return {
      attemptSubmit: false,
      exceptions: [],
      address: null,
      folder: null,
      hash: null,
      file: null
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
      // let isValid = this.$refs.searchInput.handleValidate()
      // if (!isValid) {
      //   this.$store.commit('search/updateSearch', this.search)
      //   this.$refs.searchResult.getResults()
      // }
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
.form_control {
  text-align: left;
}
</style>
