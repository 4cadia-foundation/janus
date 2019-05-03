import messageData from '../../utils/information'

// initial state
const state = {
  messages: []
}

// getters
const getters = {
  messages: state => state.messages,
  returnMessagesData (state) {
    return state.messages === messageData.getData()
  }
}

// actions
const actions = {
  getMessages ({ commit }) {
    messageData.getData(messages => {
      commit('setMessages', messages)
    })
  }
}

// mutations
const mutations = {
  setMessages (state, messages) {
    state.messages = messages
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
