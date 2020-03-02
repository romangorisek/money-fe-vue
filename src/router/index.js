import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
  },
  {
    path: '/business',
    name: 'Business',
    component: () => import(/* webpackChunkName: "business" */ '@/pages/Business.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/pages/Settings.vue'),
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import(/* webpackChunkName: "transaction" */ '@/pages/Transaction.vue'),
  },
  {
    path: '/accountTransfer',
    name: 'AccountTransfer',
    component: () => import(/* webpackChunkName: "transaction" */ '@/pages/AccountTransfer.vue'),
  },
  {
    path: '/transactionReport',
    name: 'TransactionReport',
    component: () => import(/* webpackChunkName: "transactionReport" */ '@/pages/TransactionReport.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/pages/Register.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/transactionEdit/:id',
    name: 'TransactionEdit',
    component: () => import(/* webpackChunkName: "transactionEdit" */ '@/pages/TransactionEdit.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/Login.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter (to, from, next) {
      store.dispatch('auth/signOut')
        .then(() => next({ name: 'Login' }))
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresGuest)) {
    if (!store.state.auth.jwt) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    if (store.state.auth.jwt) {
      next()
    } else {
      next({ name: 'Login', query: { redirectTo: to.path } })
    }
  }
})

export default router
