import api from './base'

export default {
  getAll () {
    return api().get('business/payments')
  },
  getById (id) {
    return api().get(`business/payments/${id}`)
  },
  create (item) {
    return api().post('business/payments', item)
  },
  update (item) {
    return api().put(`business/payments/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`business/payments/${id}`)
  },
}
