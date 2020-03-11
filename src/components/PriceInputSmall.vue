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
    @blur="formatValue"
  ></v-text-field>
</template>

<script>
import { priceFloatToInt, parsePrice } from '@/utils/price'

export default {
  props: {
    value: {
      default: null,
      type: [String, Number],
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
    if (this.value) {
      this.amount = parsePrice(this.value)
    }
  },
  methods: {
    formatValue () {
      this.amount = parsePrice(priceFloatToInt(this.amount))
    },
  },
  watch: {
    value (newValue) {
      if (this.amount !== newValue) {
        this.amount = parsePrice(newValue)
        if (this.amount === '0,00') {
          this.amount = ''
        }
      }
    },
    amount (amount) {
      this.$emit('input', this.amount)
    },
  },
}
</script>

<style lang="scss">
  .input-without-details .v-text-field__details {
    display: none;
  }
</style>
