<template>
  <v-row>
    <form @submit.prevent="save" >

      <v-col cols="12" md="6" offset-md="3">
        <v-select
          :items="accountsFrom"
          item-text="name"
          item-value="id"
          v-model="form.account_from_id"
          label="Prenesi iz računa"
        ></v-select>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.account_from_id.required)"
        >
          <FormErrorsLine v-if="!$v.form.account_from_id.required" text="Polje je obvezno" />
        </FormErrors>
      </v-col>

      <v-col cols="12" md="6" offset-md="3">
        <v-select
          :items="accountsTo"
          item-text="name"
          item-value="id"
          v-model="form.account_to_id"
          label="Prenesi v račun"
        ></v-select>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.account_to_id.required)"
        >
          <FormErrorsLine v-if="!$v.form.account_to_id.required" text="Polje je obvezno" />
        </FormErrors>
      </v-col>

      <v-col cols="12" md="6" offset-md="3">
        <PriceInput
          v-model="form.amount"
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
import { priceFloatToInt } from '@/utils/price'

export default {
  components: {
    FormErrors,
    FormErrorsLine,
    PriceInput,
  },
  data () {
    return {
      form: {
        account_from_id: null,
        account_to_id: null,
        amount: null,
      },
    }
  },
  validations: {
    form: {
      account_from_id: {
        required,
      },
      account_to_id: {
        required,
      },
      amount: {
        required,
      },
    },
  },
  computed: {
    accounts () {
      return Object.values(this.$store.state.accounts.items).map(item => { item.name = item.title; return item })
    },
    accountsFrom () {
      return this.accounts.filter(acc => acc.id !== this.form.account_to_id)
    },
    accountsTo () {
      return this.accounts.filter(acc => acc.id !== this.form.account_from_id)
    },
  },
  methods: {
    ...mapActions('accounts', { loadAccounts: 'loadItems' }),
    save () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        const data = { ...this.form }
        data.amount = priceFloatToInt(data.amount)
        this.$emit('save', { data })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    clear () {
      this.form.account_from_id = null
      this.form.account_to_id = null
      this.form.amount = null
      this.$v.$reset()
    },
  },
  created () {
    this.loadAccounts()
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 100%;
}
</style>
