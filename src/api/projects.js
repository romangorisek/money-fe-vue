import api from './base'

export default {
  getAll () {
    return api().get('business/projects')
  },
  getById (id) {
    return api().get(`business/projects/${id}`)
  },
  create (item) {
    return api().post('business/projects', item)
  },
  update (item) {
    return api().put(`business/projects/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`business/projects/${id}`)
  },
}
