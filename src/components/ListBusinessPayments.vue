<template>
  <v-col cols="12" md="6">
    <v-row>
      <v-col cols="12">
        <h3>Plačila:</h3>
      </v-col>
    </v-row>
    <v-row v-for="payment of payments" :key="payment.id">
      <v-col cols="6">
        {{payment.done_on | sloDate}}
        <br />
        {{typeOf(payment)}}
      </v-col>
      <v-col cols="6">
        {{payment.amount | priceWithSign}}
      </v-col>
    </v-row>
    <v-row class="font-weight-bold" style="boder-top: 1px solid grey;">
      <v-col cols="6">
        Skupaj
      </v-col>
      <v-col cols="6">
        {{sum | priceWithSign}}
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    payments: {
      required: true,
      type: Array,
    },
    paymentTypes: {
      required: true,
      type: Array,
    },
  },
  computed: {
    sum () {
      return this.payments.reduce((a, b) => parseInt(a) + (parseInt(b.amount) || 0), 0)
    },
  },
  methods: {
    typeOf (payment) {
      const paymentType = this.paymentTypes.find(pType => pType.id === payment.payment_type_id)
      return paymentType.title
    },
  },
}
</script>
