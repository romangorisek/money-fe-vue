<template>
  <div>
    <form @submit.prevent="save" v-if="showForm">
      <div class="row">
        <v-col cols="12">
          <h3>Dodaj opravljeno delo:</h3>
        </v-col>

        <v-col cols="12" md="6" offset-md="1">
          <PriceInput
            v-model="form.amount"
          />
          <FormErrors
            v-if="$v.form.$error && (!$v.form.amount.required)"
          >
            <FormErrorsLine v-if="!$v.form.amount.required" text="Polje je obvezno" />
          </FormErrors>
        </v-col>

        <v-col cols="12" md="6" offset-md="1">
          <v-text-field
            v-model="form.hours"
            label="Ure"
          ></v-text-field>
          <FormErrors
            v-if="$v.form.$error && (!$v.form.hours.required)"
          >
            <FormErrorsLine v-if="!$v.form.hours.required" text="Polje je obvezno" />
          </FormErrors>
        </v-col>

        <v-col cols="12" md="5" offset-md="1">
          <div>
            Od:
          </div>
          <v-date-picker
            v-model="form.done_on_start">
          </v-date-picker>
        </v-col>

        <v-col cols="12" md="5">
          <div>
            Do:
          </div>
          <v-date-picker
            v-model="form.done_on_end">
          </v-date-picker>
        </v-col>

        <v-col cols="12">
          <v-btn type="submit" class="float-right">Shrani</v-btn>
          <v-btn class="float-right mr-2" @click="showForm = false">Prekliči</v-btn>
        </v-col>
      </div>
    </form>
    <v-btn v-else @click="showForm = true">Dodaj opravljeno delo</v-btn>
  </div>
</template>

<script>
import moment from 'moment'
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
    project_id: {
      required: true,
      type: String,
    },
  },
  data () {
    return {
      form: {
        amount: null,
        hours: null,
        done_on_start: moment().format('YYYY-MM-DD'),
        done_on_end: moment().format('YYYY-MM-DD'),
      },
      showForm: false,
    }
  },
  validations: {
    form: {
      amount: {
        required,
      },
      hours: {
        required,
      },
    },
  },
  methods: {
    save () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        const data = { ...this.form, project_id: this.project_id }
        data.amount = priceFloatToInt(data.amount)
        this.$emit('save', data)
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    clear () {
      this.form.amount = null
      this.form.hours = null
      this.form.done_on_start = moment().format('YYYY-MM-DD')
      this.form.done_on_end = moment().format('YYYY-MM-DD')
      this.showForm = false
      this.$v.$reset()
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 100%;
}
</style>
