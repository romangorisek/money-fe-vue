<template>
  <v-col cols="12" md="6">
    <v-row>
      <v-col cols="12">
        <h3>Opravljeno delo:</h3>
      </v-col>
    </v-row>
    <v-row v-for="workItem of work" :key="workItem.id">
      <v-col cols="6">
        {{workItem.done_on_start | sloDate}} - {{workItem.done_on_end | sloDate}}
      </v-col>
      <v-col cols="6">
        {{workItem.amount | priceWithSign}}
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
    work: {
      required: true,
      type: Array,
    },
  },
  computed: {
    sum () {
      return this.work.reduce((a, b) => parseInt(a) + (parseInt(b.amount) || 0), 0)
    },
  },
}
</script>
