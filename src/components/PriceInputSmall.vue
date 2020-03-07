<template>
  <v-text-field
    class="input-without-details"
    v-model="amount"
    :label="label"
    solo
    dense
    :prepend-icon="amountSign"
    :success="isIncomeSelected"
    :error="isExpenseSelected"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String,
    },
    label: {
      default: 'Znesek',
      type: String,
    },
    isIncomeSelected: {
      type: Boolean,
      default: false,
    },
    isExpenseSelected: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      amount: '',
    }
  },
  computed: {
    amountSign () {
      if (!this.isIncomeSelected && !this.isExpenseSelected) {
        return ''
      }
      return this.isIncomeSelected ? 'mdi-plus' : 'mdi-minus'
    },
  },
  created () {
    this.amount = this.value
  },
  watch: {
    value (newValue) {
      if (this.amount !== newValue) {
        this.amount = newValue
      }
    },
    amount (newValue, oldValue) {
      let modifiedValue = newValue.replace(',', '')
      if (newValue.length > oldValue.length) {
        if (newValue[0] === '0') {
          modifiedValue = modifiedValue.substring(1)
        }
        this.amount = modifiedValue.substring(0, modifiedValue.length - 2) + ',' + modifiedValue.substring(modifiedValue.length - 2)
        this.$emit('input', this.amount)
      } else if (newValue.length < oldValue.length) {
        if (oldValue !== '0,00') {
          if (modifiedValue.length === 2) {
            modifiedValue = '00' + modifiedValue
          }
          if (modifiedValue.length < 2) {
            modifiedValue = '0' + modifiedValue
          }
          this.amount = modifiedValue.substring(0, modifiedValue.length - 2) + ',' + modifiedValue.substring(modifiedValue.length - 2)
          this.$emit('input', this.amount)
        } else {
          this.amount = '00,00'
          this.$emit('input', this.amount)
        }
      }
    },
  },
}
</script>

<style lang="scss">
  .input-without-details .v-text-field__details {
    display: none;
  }
</style>
