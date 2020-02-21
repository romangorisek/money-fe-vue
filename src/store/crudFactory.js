import { arrayToObject } from '@/utils/object'

export const loadItemsBuilder = ({ apiEndpoint }) => ({ commit, rootState }) => {
  return new Promise((resolve, reject) => {
    import('@/api/' + apiEndpoint)
      .then(({ default: api }) => {
        api.getAll()
          .then(({ data }) => {
            const items = arrayToObject(data)
            commit('setElements', { type: 'items', elements: items })
            resolve(items)
          })
          .catch(error => {
            reject(error)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const loadItemBuilder = ({ apiEndpoint }) => ({ commit, rootState }, id) => {
  return new Promise((resolve, reject) => {
    import('@/api/' + apiEndpoint)
      .then(({ default: api }) => {
        api.getById(id)
          .then(({ data }) => {
            const item = data
            commit('setElement', { type: 'items', id, element: item })
            resolve(item)
          })
          .catch(error => {
            reject(error)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const createItemBuilder = ({ apiEndpoint }) => ({ commit, rootState }, item) => {
  return new Promise((resolve, reject) => {
    import('@/api/' + apiEndpoint)
      .then(({ default: api }) => {
        api.create(item)
          .then(({ data }) => {
            const itemId = data.id
            commit('setElement', { type: 'items', id: itemId, element: { id: itemId, ...item } })
            resolve({ id: itemId, ...item })
          })
          .catch(error => {
            reject(error)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const updateItemBuilder = ({ apiEndpoint }) => ({ commit, rootState }, item) => {
  return new Promise((resolve, reject) => {
    import('@/api/' + apiEndpoint)
      .then(({ default: api }) => {
        api.update(item)
          .then(({ data }) => {
            const itemId = data.id
            commit('setElement', { type: 'items', id: itemId, element: { id: itemId, ...item } })
            resolve({ id: itemId, ...item })
          })
          .catch(error => {
            reject(error)
          })
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const deleteItemBuilder = ({ apiEndpoint }) => ({ commit, rootState }, id) => {
  return new Promise((resolve, reject) => {
    import('@/api/' + apiEndpoint)
      .then(({ default: api }) => {
        api.delete(id)
          .then(response => {
            commit('removeElement', { type: 'items', id })
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
}
