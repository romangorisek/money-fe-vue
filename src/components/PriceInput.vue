<template>
  <v-text-field
    v-model="amount"
    :label="label"
    type="number"
    step="0.01"
    :prepend-icon="amountSign"
    :success="isIncomeSelected"
    :error="isExpenseSelected"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      default: null,
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
    this.amount = (this.value + '').replace(',', '.')
  },
  watch: {
    value (newValue) {
      if (this.amount !== newValue) {
        this.amount = (newValue + '').replace(',', '.')
      }
    },
    amount (amount) {
      this.$emit('input', this.amount)
    },
  },
}
</script>
