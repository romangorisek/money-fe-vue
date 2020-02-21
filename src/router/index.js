import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Home.vue'),
  },
  {
    path: '/business',
    name: 'Business',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Business.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Settings.vue'),
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Transaction.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Register.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Login.vue'),
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
