<template>
  <div class="content">
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form_content">
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
    <div v-if="hasExceptions" class="errors">
      <ul class="errors-list">
        <li v-for="(exception, index) in this.exceptions" :key="index">{{ exception }}</li>
      </ul>
    </div>
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
      folder: '',
      hash: '',
      file: ''
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
  margin: 0 auto 100px;
}
.form_field {
  position: relative;
}
.form_control {
  text-align: right;
}
</style>
