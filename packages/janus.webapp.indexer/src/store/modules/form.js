// initial state
const state = {
  walletAddress: null,
  folderPath: null,
  hashAddress: null,
  uploadedFiles: [],
  return: []
}

// getters
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  setWalletAddress (state, walletAddress) {
    state.walletAddress = walletAddress
  },
  setFolderPath (state, folderPath) {
    state.folderPath = folderPath
  },
  setHashAddress (state, hashAddress) {
    state.hashAddress = hashAddress
  },
  setUploadedFiles (state, uploadedFiles) {
    state.uploadedFiles.push(uploadedFiles)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
