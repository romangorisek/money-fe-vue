import mutations from '../mutations'
import transactions from '@/api/transactions'
import { arrayToObject } from '@/utils/object'

import { loadItemBuilder, createItemBuilder, updateItemBuilder, deleteItemBuilder } from '../crudFactory'
const apiEndpoint = 'transactions'

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    loadItems ({ commit }, filters) {
      return new Promise((resolve, reject) => {
        transactions.getAll(filters)
          .then(({ data }) => {
            const items = arrayToObject(data)
            commit('setElements', { type: 'items', elements: items })
            resolve(items)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    loadItem: loadItemBuilder({ apiEndpoint }),
    createItem: createItemBuilder({ apiEndpoint }),
    updateItem: updateItemBuilder({ apiEndpoint }),
    deleteItem: deleteItemBuilder({ apiEndpoint }),
  },

  mutations: {
    ...mutations,
  },
}
