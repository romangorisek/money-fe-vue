<template>
  <v-row>
    <form @submit.prevent="save" >

      <v-col cols="12" md="6" offset-md="3">
        <v-text-field
          v-model="form.title"
          label="Ime"
        ></v-text-field>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.title.required)"
        >
          <FormErrorsLine v-if="!$v.form.title.required" text="Polje je obvezno" />
        </FormErrors>
      </v-col>

      <v-col cols="12" md="6" offset-md="3">
        <PriceInput
          v-model="form.balance"
          label="Stanje"
        ></PriceInput>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.balance.required)"
        >
          <FormErrorsLine v-if="!$v.form.balance.required" text="Polje je obvezno" />
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
import { priceFloatToInt } from '@/utils/price'

export default {
  components: {
    FormErrors,
    FormErrorsLine,
    PriceInput,
  },
  props: {
    account: {
      default: () => {},
      type: Object,
    },
  },
  data () {
    return {
      form: {
        title: null,
        balance: null,
      },
    }
  },
  validations: {
    form: {
      title: {
        required,
      },
      balance: {
        required,
      },
    },
  },
  methods: {
    save () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.form.balance = priceFloatToInt(this.form.balance)
        this.$emit('save', { data: this.form })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    clear () {
      this.form.title = null
      this.form.balance = null
      this.$v.$reset()
    },
  },
  created () {
    this.form = { ...this.form, ...this.account }
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 100%;
}
</style>
