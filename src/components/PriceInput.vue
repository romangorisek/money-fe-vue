<template>
  <v-text-field
    v-model="amount"
    :label="label"
    :prepend-icon="amountSign"
    :success="isIncomeSelected"
    :error="isExpenseSelected"
    @blur="formatValue"
  ></v-text-field>
</template>

<script>
import { priceFloatToInt, parsePrice } from '@/utils/price'

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
    this.amount = parsePrice(this.value)
  },
  methods: {
    formatValue () {
      this.form.amount = parsePrice(priceFloatToInt(this.form.amount))
    },
  },
  watch: {
    value (newValue) {
      if (this.amount !== newValue) {
        this.amount = parsePrice(newValue)
      }
    },
    amount (amount) {
      this.$emit('input', this.amount)
    },
  },
}
</script>
