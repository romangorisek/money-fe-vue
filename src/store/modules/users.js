import users from '@/api/users'

export default {
  namespaced: true,

  state: {
    currentUser: null,
    items: {},
  },

  actions: {
    loadCurrentUser ({ commit }) {
      return new Promise((resolve, reject) => {
        users.me()
          .then(({ data }) => {
            commit('setCurrentUser', data)
            resolve(data)
          })
          .catch(error => reject(error))
      })
    },
    deleteCurrentUser ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setCurrentUser', null)
        resolve()
      })
    },
  },

  mutations: {
    setCurrentUser (state, user) {
      state.currentUser = user
    },
  },
}
