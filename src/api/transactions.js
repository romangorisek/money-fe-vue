import api from './base'

export default {
  getAll (filters) {
    return api().get('transactions', { params: filters })
  },
  getById (id) {
    return api().get(`transactions/${id}`)
  },
  create (item) {
    return api().post('transactions', item)
  },
  update (item) {
    return api().put(`transactions/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`transactions/${id}`)
  },
}
