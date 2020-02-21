import auth from '@/api/auth'

export default {
  namespaced: true,

  state: {
    jwt: localStorage.getItem('jwt'),
  },

  getters: {
    user (state, getters, rootState) {
      return state.userId ? rootState.users.currentUser : null
    },
  },

  actions: {
    signInWithEmailAndPassword ({ commit, dispatch }, { email, password }) {
      return new Promise((resolve, reject) => {
        console.log()
        auth.login({ email, password })
          .then(({ data }) => {
            const jwt = data.access_token
            commit('setJwt', jwt)
            dispatch('loadUser')
              .then(user => {
                resolve()
              })
              .catch(error => {
                reject(error)
              })
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    loadUser ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        dispatch('users/loadCurrentUser', {}, { root: true })
          .then(user => {
            resolve(user)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    signOut ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        dispatch('users/deleteCurrentUser', null, { root: true })
          .then(success => {
            commit('setJwt', null)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    forceSignOut ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        dispatch('users/deleteCurrentUser', null, { root: true })
          .then(success => {
            commit('setJwt', null)
            resolve()
          })
          .catch(error => reject(error))
      })
    },
  },

  mutations: {
    setJwt (state, jwt) {
      jwt ? localStorage.setItem('jwt', jwt) : localStorage.removeItem('jwt')
      state.jwt = jwt
    },
  },
}
