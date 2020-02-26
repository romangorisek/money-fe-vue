<template>
  <div>
    <div class="row">
      <div class="col-6 text-right">
        Varčevanje:
      </div>
      <div class="col-6 text-center">
        {{ sumSavings | price }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right">
        <b>Ostalo:</b>
      </div>
      <div class="col-6 text-center">
        <b>{{ sumOther | price }}</b>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-right">
        Skupaj:
      </div>
      <div class="col-6 text-center">
        {{ sumTotal | price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accounts: {
      required: true,
      type: Array,
    },
  },
  data () {
    return {
      sumSavings: 0,
      sumOther: 0,
      sumTotal: 0,
    }
  },
  methods: {
    isSavingsAccount (account) {
      // return account.id === '1271588f-9907-4ea5-a8be-04fe678cb572' || account.id === 'af8a1675-69fc-4ca8-996d-18dd2b32efdc'
      return false
    },
  },
  created () {
    this.accounts.forEach(account => {
      this.sumTotal += account.balance
      if (this.isSavingsAccount(account)) {
        this.sumSavings += account.balance
      } else {
        this.sumOther += account.balance
      }
    })
  },
}
</script>
