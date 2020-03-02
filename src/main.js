import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import notifications from '@/mixins/notifications'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import { parsePrice } from '@/utils/price'

import AppSpinner from '@/components/AppSpinner'

import 'awesome-notifications/dist/style.css'
import 'awesome-notifications/dist/index.var.js'

const moment = require('moment')
require('moment/locale/sl')

Vue.use(Vuelidate)
Vue.use(require('vue-moment'), {
  moment,
})

Vue.use(VueLodash, { lodash })

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
