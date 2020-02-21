import api from './base'

export default {
  getAll () {
    return api().get('accounts')
  },
  getById (id) {
    return api().get(`accounts/${id}`)
  },
  create (item) {
    return api().post('accounts', item)
  },
  update (item) {
    return api().put(`accounts/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`accounts/${id}`)
  },
}
