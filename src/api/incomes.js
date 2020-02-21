import api from './base'

export default {
  getAll () {
    return api().get('incomes')
  },
  getById (id) {
    return api().get(`incomes/${id}`)
  },
  create (item) {
    return api().post('incomes', item)
  },
  update (item) {
    return api().put(`incomes/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`incomes/${id}`)
  },
}
