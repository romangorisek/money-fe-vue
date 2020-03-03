<template>
  <div>
    <div class="row">
      <div class="col">
        <h4>{{ currentMonth }}:</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right">
        Prihodki:
      </div>
      <div class="col-6 text-center">
        {{ totalIncome | priceWithSign }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right">
        Stroski:
      </div>
      <div class="col-6 text-center">
        {{ totalExpense | priceWithSign }}
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
      <div class="col-6 text-center" :class="balance < 0 ? 'balance-red' : ''">
        {{ balance | priceWithSign }}
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

<style lang="scss" scoped>
.balance-red {
  color: red;
  font-weight: bold;
}
</style>
