import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'

import notifications from '@/mixins/notifications'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { parsePrice } from '@/utils/price'

import AppSpinner from '@/components/AppSpinner'

const moment = require('moment')
require('moment/locale/si')

Vue.use(Vuelidate)
Vue.use(require('vue-moment'), {
  moment,
})

Vue.filter('price', function (price) {
  return parsePrice(price)
})
Vue.filter('sloDate', function (date) {
  return moment(date).format('DD.MM.YYYY')
})

Vue.config.productionTip = false

Vue.component('AppSpinner', AppSpinner)

Vue.mixin({
  ...notifications,
})
Vue.mixin({
  ...asyncDataStatus,
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
