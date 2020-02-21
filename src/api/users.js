import api from './base'

export default {
  me () {
    return api().post('auth/me', {})
  },
}
