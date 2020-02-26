import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import users from './modules/users'
import accounts from './modules/accounts'
import incomes from './modules/incomes'
import expenses from './modules/expenses'
import transactions from './modules/transactions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    users,
    accounts,
    incomes,
    expenses,
    transactions,
  },
})
