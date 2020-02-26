<template>
  <form @submit.prevent="save">
    <v-row>
      <v-col
        cols="6"
        md="2"
      >
        <v-menu
          v-model="showStartDatePicker"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="formatedStartDate"
              label="Datum transakcije"
              readonly
              dense
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateStart"
            @change="showStartDatePicker = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="6"
        md="2"
      >
        <v-menu
          v-model="showEndDatePicker"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="formatedEndDate"
              label="Datum transakcije"
              readonly
              dense
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateEnd"
            @change="showEndDatePicker = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="6"
        md="2"
      >
        <v-select
          :items="transactionTypes"
          item-text="name"
          item-value="id"
          v-model="form.transactionType"
          label="Tip transakcije"
          dense
        ></v-select>
      </v-col>

      <v-col
        cols="6"
        md="2"
      >
        <v-select
          :items="accounts"
          item-text="name"
          item-value="id"
          v-model="form.account"
          label="Račun"
          dense
        ></v-select>
      </v-col>

      <v-col
        cols="6"
        offset="6"
        md="2"
        offset-md="0"
      >
        <v-btn type="submit" :class="this.$vuetify.breakpoint.mdAndUp ? 'float-left' : 'float-right'">Filtriraj</v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dateStart: this.$moment().startOf('month').format().substr(0, 10),
      showStartDatePicker: false,
      dateEnd: this.$moment().endOf('month').format().substr(0, 10),
      showEndDatePicker: false,
      form: {
        start: null,
        end: null,
        account: null,
        transactionType: null,
      },
    }
  },
  computed: {
    formatedStartDate () {
      return this.dateStart ? this.$moment(this.dateStart).format('DD.MM.YYYY') : ''
    },
    formatedEndDate () {
      return this.dateEnd ? this.$moment(this.dateEnd).format('DD.MM.YYYY') : ''
    },
    transactionTypes () {
      const incomes = Object.values(this.$store.state.incomes.items).map(item => { item.group = 'Prihodki'; item.name = item.title; return item })
      const expenses = Object.values(this.$store.state.expenses.items).map(item => { item.group = 'Odhodki'; item.name = item.title; return item })

      return [
        {
          name: 'Vsi',
          id: null,
        },
        { header: 'Odhodki' },
        ...expenses,
        { divider: true },
        { header: 'Prihodki' },
        ...incomes,
      ]
    },
    accounts () {
      return [
        {
          name: 'Vsi',
          id: null,
        },
        ...Object.values(this.$store.state.accounts.items).map(item => { item.name = item.title; return item }),
      ]
    },
  },
  methods: {
    ...mapActions('accounts', { loadAccounts: 'loadItems' }),
    ...mapActions('incomes', { loadIncomes: 'loadItems' }),
    ...mapActions('expenses', { loadExpenses: 'loadItems' }),
    save () {
      this.form.start = this.$moment(this.dateStart).format()
      this.form.end = this.$moment(this.dateEnd).format()
      this.$emit('change', { data: this.form })
    },
    clear () {
      this.dateStart = this.$moment().startOf('month').format().substr(0, 10)
      this.dateEnd = this.$moment().endOf('month').format().substr(0, 10)
      this.form = {
        start: null,
        end: null,
        account: null,
        transactionType: null,
      }
    },
  },
  created () {
    this.loadAccounts()
    this.loadIncomes()
    this.loadExpenses()
  },
}
</script>
