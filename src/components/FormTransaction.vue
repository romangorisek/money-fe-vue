<template>
  <v-row>
    <v-col cols="12" md="6" offset-md="3">
      <form @submit.prevent="save">

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

        <v-select
          :items="accounts"
          item-text="name"
          item-value="id"
          v-model="form.account_id"
          label="Stopnja davka"
        ></v-select>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.account_id.required)"
        >
          <FormErrorsLine v-if="!$v.form.account_id.required" text="Polje je obvezno" />
        </FormErrors>

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
        <FormErrors
          v-if="$v.form.$error && (!$v.form.account_id.required)"
        >
          <FormErrorsLine v-if="!$v.form.account_id.required" text="Polje je obvezno" />
        </FormErrors>

        <v-text-field
          v-model="form.amount"
          label="Znesek"
        ></v-text-field>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.amount.required)"
        >
          <FormErrorsLine v-if="!$v.form.amount.required" text="Polje je obvezno" />
        </FormErrors>

        <v-btn type="submit" class="float-right">Shrani</v-btn>

      </form>
    </v-col>
  </v-row>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import FormErrors from '@/components/FormErrors'
import FormErrorsLine from '@/components/FormErrorsLine'

export default {
  components: {
    FormErrors,
    FormErrorsLine,
  },
  props: {
    transactionTypes: {
      required: true,
      type: Array,
    },
    accounts: {
      required: true,
      type: Array,
    },
    transaction: {
      default: () => {},
      type: Object,
    },
  },
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      showDatePicker: false,
      form: {
        type_id: null,
        account_id: null,
        done_on: this.$moment(),
        amount: null,
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
      done_on: {
        required,
      },
      amount: {
        required,
      },
    },
  },
  computed: {
    formatedDate () {
      return this.date ? this.$moment(this.date).format('DD.MM.YYYY') : ''
    },
  },
  methods: {
    save () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$emit('save', { data: this.form })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
  },
  created () {
    this.form = { ...this.form, ...this.group }
  },
}
</script>
