import messageData from '../../utils/messages.json'

// initial state
const state = {
  success: messageData.success,
  errors: messageData.errors,
  exceptions: messageData.exceptions
}

// getters
const getters = {
  getErrors: state => state.errors,
  getErrorByType: (state, getters) => (type) => {
    return state.errors.find(error => error.type === type).text
  },
  errorMatchHttp: (state, getters) => (httpCode) => {
    return state.errors.find(error => error.httpCode === httpCode).text
  },
  getExceptionByType: (state, getters) => (type) => {
    return state.exceptions.find(exception => exception.type === type).text
  }
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
