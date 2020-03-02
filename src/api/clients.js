import api from './base'

export default {
  getAll () {
    return api().get('business/clients')
  },
  getById (id) {
    return api().get(`business/clients/${id}`)
  },
  create (item) {
    return api().post('business/clients', item)
  },
  update (item) {
    return api().put(`business/clients/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`business/clients/${id}`)
  },
}
