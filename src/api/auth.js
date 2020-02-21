import api from './base'

export default {
  login (data) {
    return api().post('auth/login', data)
  },
}
