import messageData from '../../utils/messages'

// initial state
const state = {
  messages: messageData.messages
}

// getters
const getters = {
  messages: state => state.messages,
  getErrors: state => state.messages.errors,
  errorMatchesHttp: (state, getters) => (httpCode) => {
    return state.messages.errors.find(errors => errors.httpCode === httpCode)
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
