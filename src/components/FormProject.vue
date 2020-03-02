<template>
  <v-row>
    <form @submit.prevent="save" >
      <v-col cols="12" md="6" offset-md="3">
        <v-select
          :items="clients"
          item-text="title"
          item-value="id"
          v-model="form.client_id"
          label="Stranka"
        ></v-select>
        <FormErrors
          v-if="$v.form.$error && (!$v.form.client_id.required)"
        >
          <FormErrorsLine v-if="!$v.form.client_id.required" text="Polje je obvezno" />
        </FormErrors>
      </v-col>

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
        <v-btn type="submit" class="float-right">Shrani</v-btn>
      </v-col>
    </form>
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
    project: {
      default: () => {},
      type: Object,
    },
    clients: {
      required: true,
      type: Array,
    },
  },
  data () {
    return {
      form: {
        client_id: null,
        title: null,
      },
    }
  },
  validations: {
    form: {
      title: {
        required,
      },
      client_id: {
        required,
      },
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
    clear () {
      this.form.title = null
      this.form.client_id = null
      this.$v.$reset()
    },
  },
  created () {
    this.form = { ...this.form, ...this.project }
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 100%;
}
</style>
