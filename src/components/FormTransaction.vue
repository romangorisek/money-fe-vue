<template>
  <v-row>
    <form @submit.prevent="save" >

      <v-col cols="12" md="6" offset-md="3">
        <v-select
          :items="transactionTypes"
          item-text="name"
          item-value="id"
          v-model="form.type_id"
          label="Tip transakcije"
        ></v-select>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.type_id.required)"
        >
          <FormErrorsLine v-if="!$v.form.type_id.required" text="Polje je obvezno" />
        </FormErrors>
      </v-col>

      <v-col cols="12" md="6" offset-md="3">
        <v-select
          :items="accounts"
          item-text="name"
          item-value="id"
          v-model="form.account_id"
          label="Račun"
        ></v-select>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.account_id.required)"
        >
          <FormErrorsLine v-if="!$v.form.account_id.required" text="Polje je obvezno" />
        </FormErrors>
      </v-col>

      <v-col cols="12" md="6" offset-md="3">
        <v-menu
          v-model="showDatePicker"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="formatedDate"
              label="Datum transakcije"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            @change="showDatePicker = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="6" offset-md="3">
        <PriceInput
          v-model="form.amount"
          :isIncomeSelected="isIncomeSelected"
          :isExpenseSelected="form.type_id !== null && !isIncomeSelected"
        />
        <FormErrors
          v-if="$v.form.$error && (!$v.form.amount.required)"
        >
          <FormErrorsLine v-if="!$v.form.amount.required" text="Polje je obvezno" />
        </FormErrors>
      </v-col>

      <v-col cols="12" md="6" offset-md="3">
        <v-btn type="submit" class="float-right">Shrani</v-btn>
      </v-col>
    </form>
  </v-row>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import FormErrors from './FormErrors'
import FormErrorsLine from './FormErrorsLine'
import PriceInput from './PriceInput'
import { mapActions } from 'vuex'

export default {
  components: {
    FormErrors,
    FormErrorsLine,
    PriceInput,
  },
  props: {
    transaction: {
      default: () => {},
      type: Object,
    },
  },
  data () {
    return {
      date: this.$moment().format('YYYY-MM-DD'),
      showDatePicker: false,
      form: {
        type_id: null,
        account_id: null,
        done_on: null,
        amount: '0,00',
      },
    }
  },
  validations: {
    form: {
      type_id: {
        required,
      },
      account_id: {
        required,
      },
      amount: {
        required,
      },
    },
  },
  computed: {
    isIncomeSelected () {
      return this.form.type_id !== null && this.incomes.filter(income => income.id === this.form.type_id).length > 0
    },
    formatedDate () {
      return this.date ? this.$moment(this.date).format('DD.MM.YYYY') : ''
    },
    incomes () {
      return Object.values(this.$store.state.incomes.items)
    },
    expenses () {
      return Object.values(this.$store.state.expenses.items)
    },
    transactionTypes () {
      const incomes = this.incomes.map(item => { item.group = 'Prihodki'; item.name = item.title; return item })
      const expenses = this.expenses.map(item => { item.group = 'Odhodki'; item.name = item.title; return item })

      return [
        { header: 'Odhodki' },
        ...expenses,
        { divider: true },
        { header: 'Prihodki' },
        ...incomes,
      ]
    },
    accounts () {
      return Object.values(this.$store.state.accounts.items).map(item => { item.name = item.title; return item })
    },

  },
  methods: {
    ...mapActions('accounts', { loadAccounts: 'loadItems' }),
    ...mapActions('incomes', { loadIncomes: 'loadItems' }),
    ...mapActions('expenses', { loadExpenses: 'loadItems' }),
    save () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.form.done_on = this.$moment(this.date).format('YYYY-MM-DD HH:mm:ss')
        const data = { ...this.form }
        data.amount = (data.amount + '').replace(',', '')
        if (!this.isIncomeSelected) {
          data.amount = '-' + data.amount
        }
        this.$emit('save', { data })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    clear () {
      this.form.type_id = null
      this.form.account_id = null
      this.form.done_on = null
      this.form.amount = '0,00'
      this.$v.$reset()
    },
  },
  created () {
    this.loadAccounts()
    this.loadIncomes()
    this.loadExpenses()
    if (!this._.isEmpty(this.transaction)) {
      this.form = { ...this.form, ...this.transaction, amount: Math.abs(this.transaction.amount / 100).toFixed(2).replace('.', ',') }
    }
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 100%;
}
</style>
