import api from './base'

export default {
  getAll () {
    return api().get('business/payment_types')
  },
  getById (id) {
    return api().get(`business/payment_types/${id}`)
  },
  create (item) {
    return api().post('business/payment_types', item)
  },
  update (item) {
    return api().put(`business/payment_types/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`business/payment_types/${id}`)
  },
}
