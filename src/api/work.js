import api from './base'

export default {
  getAll () {
    return api().get('business/work')
  },
  getById (id) {
    return api().get(`business/work/${id}`)
  },
  create (item) {
    return api().post('business/work', item)
  },
  update (item) {
    return api().put(`business/work/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`business/work/${id}`)
  },
}
