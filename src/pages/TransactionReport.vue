<template>
  <div>
    <FormTransactionReportFilters
      @change="applyFilters"
    />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Razlog</th>
            <th>Datum</th>
            <th>Račun</th>
            <th>Znesek (€)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ getTransactionTypeNameById(transaction.type_id) }}</td>
            <td>{{ formatDate(transaction.done_on) }}</td>
            <td>{{ getAccountNameById(transaction.account_id) }}</td>
            <td :class="transaction.amount >= 0 ? 'green--text' : 'red--text'" >{{ transaction.amount | price }}</td>
            <td class="text-right">
              <ButtonActionEdit @click="edit(transaction)" />
              <ButtonActionDelete @click="deleteTransaction(transaction)" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import ButtonActionEdit from '@/components/ButtonActionEdit'
import ButtonActionDelete from '@/components/ButtonActionDelete'
import FormTransactionReportFilters from '@/components/FormTransactionReportFilters'
import { mapActions } from 'vuex'

export default {
  components: {
    ButtonActionEdit,
    ButtonActionDelete,
    FormTransactionReportFilters,
  },
  computed: {
    transactions () {
      return Object.values(this.$store.state.transactions.items)
    },
    incomes () {
      return Object.values(this.$store.state.incomes.items)
    },
    expenses () {
      return Object.values(this.$store.state.expenses.items)
    },
    accounts () {
      return Object.values(this.$store.state.accounts.items)
    },
  },
  methods: {
    ...mapActions('transactions', { loadTransactions: 'loadItems' }),
    ...mapActions('accounts', { loadAccounts: 'loadItems' }),
    ...mapActions('incomes', { loadIncomes: 'loadItems' }),
    ...mapActions('expenses', { loadExpenses: 'loadItems' }),
    getTransactionTypeNameById (id) {
      let title = 'Razlog ne obstaja'
      this.incomes.forEach(element => {
        if (element.id === id) {
          title = element.title
        }
      })
      this.expenses.forEach(element => {
        if (element.id === id) {
          title = element.title
        }
      })
      return title
    },
    getAccountNameById (id) {
      let title = 'Račun ne obstaja'
      this.accounts.forEach(element => {
        if (element.id === id) {
          title = element.title
        }
      })
      return title
    },
    formatDate (date) {
      return this.$moment(date).format('DD.MM.YYYY')
    },
    edit (transaction) {
      this.$router.push({ name: 'TransactionEdit', params: { id: transaction.id } })
    },
    applyFilters ({ data }) {
      this.loadTransactions(data)
    },
  },
  created () {
    const filters = {
      start: this.$moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
      end: this.$moment().endOf('month').format('YYYY-MM-DD 23:59:59'),
    }

    Promise.all([
      this.loadTransactions(filters),
      this.loadIncomes(),
      this.loadExpenses(),
      this.loadAccounts(),
    ])
      .then(transactions => {
        this.$emit('ready')
      })
  },
}
</script>
