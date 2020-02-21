import axios from 'axios'
import store from '@/store/index'

export default () => {
  const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'api-key': process.env.VUE_APP_API_KEY,
      Authorization: `Bearer ${store.state.auth.jwt}`,
    },
  })
  // api.interceptors.request.use(
  //   request => {
  //     request.url += request.url.includes('?') ? '&' : '?'
  //     request.url += `api_key=${process.env.VUE_APP_API_KEY}`
  //     // request.url += '&log=true'
  //     return request
  //   },
  // )
  api.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status === 401 && window.location.pathname !== '/login') {
        store.dispatch('auth/forceSignOut')
          .then(() => {
            location.reload()
          })
      }
      return Promise.reject(error)
    },
  )
  return api
}
