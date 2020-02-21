import Vue from 'vue'

export default {
  setElements (state, { type, elements }) {
    Vue.set(state, type, { ...elements })
  },
  setElement (state, { type, id, element }) {
    Vue.set(state[type], id, { ...element })
  },
  removeElement (state, { type, id }) {
    Vue.delete(state[type], id)
  },
}
