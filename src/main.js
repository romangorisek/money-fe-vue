import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AppSpinner from '@/components/AppSpinner'

Vue.config.productionTip = false

Vue.component('AppSpinner', AppSpinner)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
