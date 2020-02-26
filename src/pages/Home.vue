<template>
  <div>
    <div class="row">
      <div class="col-6 mb-4" v-if="accounts.length">
        <div class="row mb-4">
          <div class="col">
            <h5 class="mb-2">Stanje na računih:</h5>
            <accountSum :accounts="accounts"></accountSum>
          </div>
        </div>
        <div class="row" v-if="bulletCharts.length">
          <div class="col">
            <h5 class="mb-2">Budget:</h5>
            <div v-for="bulletChart of bulletCharts" :key="bulletChart.title">
              <bulletChart :chartData="bulletChart"></bulletChart>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 mb-4">
          <h5 class="mb-2">Razporeditev porabe:</h5>
          <div id="chartdiv" style="width: 100%; height: 500px"></div>
      </div>
    </div>

    <div class="row"  v-if="transactions.length">
      <div class="col">
        <monthlyBalance :transactions="transactions"></monthlyBalance>
      </div>
    </div>
  </div>
</template>

<script>
import accountSum from '@/components/accountSum'
import monthlyBalance from '@/components/monthlyBalance'
import bulletChart from '@/components/bulletChart'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import { mapActions } from 'vuex'

export default {
  components: {
    accountSum,
    monthlyBalance,
    bulletChart,
  },
  data () {
    return {
      bulletCharts: [],
    }
  },
  computed: {
    transactions () {
      return Object.values(this.$store.state.transactions.items)
    },
    accounts () {
      return Object.values(this.$store.state.accounts.items)
    },
    incomes () {
      return Object.values(this.$store.state.incomes.items)
    },
    expenses () {
      return Object.values(this.$store.state.expenses.items)
    },
  },
  methods: {
    ...mapActions('accounts', { loadAccounts: 'loadItems' }),
    ...mapActions('transactions', { loadTransactions: 'loadItems' }),
    ...mapActions('incomes', { loadIncomes: 'loadItems' }),
    ...mapActions('expenses', { loadExpenses: 'loadItems' }),
    getTransactionTypeNameById (id) {
      let title = 'Razlog ne obstaja'
      this.incomes.forEach(element => {
        if (element.id === id) {
          title = element.title
        }
      })
      this.expenses.forEach(element => {
        if (element.id === id) {
          title = element.title
        }
      })
      return title
    },
    showPieChart () {
      setTimeout(() => {
        am4core.useTheme(am4themesAnimated)
        // Themes end

        // Create chart instance
        const chart = am4core.create('chartdiv', am4charts.PieChart)

        // Add data
        chart.data = this.pieChartData()

        // Add and configure Series
        const pieSeries = chart.series.push(new am4charts.PieSeries())
        pieSeries.dataFields.value = 'sum'
        pieSeries.dataFields.category = 'title'
        pieSeries.slices.template.stroke = am4core.color('#fff')
        pieSeries.slices.template.strokeWidth = 2
        pieSeries.slices.template.strokeOpacity = 1

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1
        pieSeries.hiddenState.properties.endAngle = -90
        pieSeries.hiddenState.properties.startAngle = -90

        this.chart = chart
      }, 1000)
    },

    pieChartData () {
      let data = []
      const groupbytitle = this.transactions.reduce((h, transaction) => {
        const title = this.getTransactionTypeNameById(transaction.type_id)
        return Object.assign(h, { [title]: (h[title] || []).concat(transaction.amount) })
      }, {})
      data = Object.keys(groupbytitle).map((key, i) => {
        return { title: key, sum: -1 * groupbytitle[key].reduce((a, b) => a + b) }
      })
      return data
    },

    setBulletChartData () {
      const bulletChartData = []
      const pieChartData = this.pieChartData()
      this.expenses.forEach(expense => {
        if (expense.budget) {
          const newBulletChartData = {}
          newBulletChartData.budget = expense.budget
          newBulletChartData.title = expense.title
          newBulletChartData.sum = 0
          pieChartData.forEach(item => {
            if (item.title === expense.title) {
              newBulletChartData.sum = item.sum
            }
          })
          bulletChartData.push(newBulletChartData)
        }
      })
      this.bulletCharts = bulletChartData
    },
  },
  created () {
    const filters = {
      start: this.$moment().startOf('month').format('YYYY-MM-DD 00:00:00'),
      end: this.$moment().endOf('month').format('YYYY-MM-DD 23:59:59'),
    }

    Promise.all([
      this.loadTransactions(filters),
      this.loadIncomes(),
      this.loadExpenses(),
      this.loadAccounts(),
    ])
      .then(transactions => {
        this.$emit('ready')
        this.showPieChart()
        this.setBulletChartData()
      })
  },
}
</script>
