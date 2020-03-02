<template>
  <div class="">
    <div class="row">
      <div class="col-6 text-center">
        <b>Varčevanje:</b>
      </div>
      <div class="col-6 text-center">
      </div>
    </div>
    <div class="row" v-for="account in savingAccounts" :key="account.id">
      <div class="col-6 text-right">
        {{account.title}}
      </div>
      <div class="col-6 text-center">
        {{account.balance | price}}
      </div>
    </div>

    <div class="row">
      <div class="col-6 text-center">
        <b>Ostalo:</b>
      </div>
      <div class="col-6 text-center">
      </div>
    </div>
    <div class="row" v-for="account in nonsavingAccounts" :key="account.id">
      <div class="col-6 text-right">
        {{account.title}}
      </div>
      <div class="col-6 text-center">
        {{account.balance | price}}
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-center">
        Skupaj varčevanje:
      </div>
      <div class="col-6 text-center">
        {{ sumSavings | price }}
      </div>
      <div class="col-6 text-center">
        <b>Skupaj ostalo:</b>
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
      <div class="col-6 text-center">
        <b>Skupaj:</b>
      </div>
      <div class="col-6 text-center">
        <b>{{ sumTotal | price }}</b>
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
  computed: {
    savingAccounts () {
      return this.accounts.filter(account => account.is_savings)
    },
    nonsavingAccounts () {
      return this.accounts.filter(account => !account.is_savings)
    },
  },
  created () {
    this.accounts.forEach(account => {
      this.sumTotal += account.balance
      if (account.is_savings) {
        this.sumSavings += account.balance
      } else {
        this.sumOther += account.balance
      }
    })
  },
}
</script>
