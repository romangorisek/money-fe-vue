import mutations from '../mutations'

import { loadItemsBuilder, loadItemBuilder, createItemBuilder, updateItemBuilder, deleteItemBuilder } from '../crudFactory'
const apiEndpoint = 'transactions'

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    loadItems: loadItemsBuilder({ apiEndpoint }),
    loadItem: loadItemBuilder({ apiEndpoint }),
    createItem: createItemBuilder({ apiEndpoint }),
    updateItem: updateItemBuilder({ apiEndpoint }),
    deleteItem: deleteItemBuilder({ apiEndpoint }),
  },

  mutations: {
    ...mutations,
  },
}
