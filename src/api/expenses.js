import api from './base'

export default {
  getAll () {
    return api().get('expenses')
  },
  getById (id) {
    return api().get(`expenses/${id}`)
  },
  create (item) {
    return api().post('expenses', item)
  },
  update (item) {
    return api().put(`expenses/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`expenses/${id}`)
  },
}
