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
    client: {
      default: () => {},
      type: Object,
    },
  },
  data () {
    return {
      form: {
        title: null,
      },
    }
  },
  validations: {
    form: {
      title: {
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
      this.$v.$reset()
    },
  },
  created () {
    this.form = { ...this.form, ...this.client }
  },
}
</script>

<style lang="scss" scoped>
form {
  width: 100%;
}
</style>
