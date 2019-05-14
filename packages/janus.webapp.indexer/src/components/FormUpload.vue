<!-- App.vue -->

<!-- HTML Template -->
<template>
  <div id="app">
    <h1>Upload Files</h1>
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving" class="form">
        <div class="txt-wallet">
          <label for="text">Wallet Address</label>
          <input type="text" class="metaMask">
        </div>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*"
            class="input-file"
          >
          <p v-if="isInitial">Drag your file(s) here to begin or click to browse</p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        </div>
        <div class="txt-folder">
          <label for="text">Folder Path</label>
          <input type="text" class="returnUpload">
        </div>
        <div class="txt-aling">
          <label for="text">Content Hash</label>
          <input type="text" class="returnUpload">
        </div>
        <div class="btn-form">
          <button type="button" class="btn-cancel">Cancel</button>
          <button type="button" class="btn-index">Index content</button>
        </div>
      </form>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
// import { upload } from './file-upload.service';

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3

export default {
  name: 'app',
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'
    }
  },
  computed: {
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
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name)
      })

      // save it
      this.save(formData)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<!-- SASS styling -->
<style>
.dropbox {
  outline-offset: -10px;
  background: rgb(214, 222, 222);
  color: dimgray;
  padding: 0px 0px;
  display: flex;
  position: relative;
  cursor: pointer;
  border-radius: 100px;
  width: 50%;
  margin: auto;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 100px;
  position: absolute;
  cursor: pointer;
  top: 0%;
  right: 0%;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  margin: auto;
  padding: 15px;
}
.metaMask {
  padding: 0px 0px;
  position: relative;
  border-radius: 20px;
  margin-bottom: 17px;
  width: 600px;
  height: 30px;
}

.returnUpload {
  padding: 0px 0px;
  position: relative;
  border-radius: 20px;
  width: 600px;
  height: 30px;
}
label {
  margin-top: 40px;
  margin: 0;
  padding: 0;
  color: gray;
  display: block;
}
.txt-wallet {
  text-align: left;
}
.txt-folder {
  text-align: left;
}
.txt-content {
  text-align: left;
}
.txt-aling {
  margin-top: 10px;
  text-align: left;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-cancel {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out;
  background-color: 15s ease-in-out;
  border-color: 0.15s ease-in-out;
  box-shadow: 0.15s ease-in-out;
  cursor: pointer;
}
.btn-index {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out;
  background-color: 15s ease-in-out;
  border-color: 0.15s ease-in-out;
  box-shadow: 0.15s ease-in-out;
  cursor: pointer;
}
.btn-form {
  margin-left: 395px;
  padding: 10px;
}
</style>
