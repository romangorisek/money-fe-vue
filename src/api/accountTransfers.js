import api from './base'

export default {
  getAll () {
    return api().get('account_transfers')
  },
  getById (id) {
    return api().get(`account_transfers/${id}`)
  },
  create (item) {
    return api().post('account_transfers', item)
  },
  update (item) {
    return api().put(`account_transfers/${item.id}`, item)
  },
  delete (id) {
    return api().delete(`account_transfers/${id}`)
  },
}
