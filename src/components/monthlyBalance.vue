<template>
  <div>
    <div class="row">
      <div class="col">
        {{ currentMonth }}:
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right">
        Prihodki:
      </div>
      <div class="col-6 text-center">
        {{ totalIncome | price }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right">
        <b>Stroski:</b>
      </div>
      <div class="col-6 text-center">
        <b>{{ totalExpense | price }}</b>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right">
        Stanje:
      </div>
      <div class="col-6 text-center">
        {{ balance | price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transactions: {
      required: true,
      type: Array,
    },
  },
  data () {
    return {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    }
  },
  computed: {
    currentMonth () {
      const currentMonth = this.$moment().format('MMMM')
      return currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)
    },
  },
  methods: {
    isSavingsAccount (account) {
      // return account.id === '1271588f-9907-4ea5-a8be-04fe678cb572' || account.id === 'af8a1675-69fc-4ca8-996d-18dd2b32efdc'
      return false
    },
  },
  created () {
    this.transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        this.totalIncome += transaction.amount
      } else {
        this.totalExpense += Math.abs(transaction.amount)
      }
    })
    this.balance = this.totalIncome - this.totalExpense
  },
}
</script>
