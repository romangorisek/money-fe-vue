<template>
  <div>
    <div class="row mb-2">
      <div class="col">
        <h5>{{chartData.title}}</h5>
      </div>
      <div class="col text-right">
        <small>
          Trenutna poraba: {{chartData.sum | price }} <br>
          Budget: {{chartData.budget | price }}
        </small>
      </div>
    </div>
    <div :id="chartId"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import * as md5 from 'md5'

export default {
  props: {
    chartData: {
      required: true,
      type: Object,
    },
  },
  data () {
    return {
      container: null,
    }
  },
  computed: {
    chartId () {
      const titleHash = md5(this.chartData.title)
      return `bulletChart-${titleHash}`
    },
  },
  mounted () {
    this.initChars()
  },
  methods: {
    initChars () {
      this.container = am4core.create(this.chartId, am4core.Container)
      this.container.width = am4core.percent(100)
      this.container.height = am4core.percent(60)
      this.container.layout = 'horizontal'

      this.createBulletChart()
    },
    createRange (axis, from, to, color) {
      const range = axis.axisRanges.create()
      range.value = from
      range.endValue = to
      range.axisFill.fill = color
      range.axisFill.fillOpacity = 0.8
      range.label.disabled = true
    },
    createBulletChart () {
      /* Create chart instance */
      const chart = this.container.createChild(am4charts.XYChart)
      chart.paddingRight = 25

      /* Add data */
      chart.data = [{
        category: '',
        value: this.chartData.sum,
        target: this.chartData.budget,
      }]

      /* Create axes */
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'category'
      categoryAxis.renderer.minGridDistance = 40
      categoryAxis.renderer.grid.template.disabled = true

      const scaleMax = this.chartData.sum > this.chartData.budget * 1.2 ? this.chartData.sum * 1.1 : this.chartData.budget * 1.2
      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.minGridDistance = 40
      valueAxis.renderer.grid.template.disabled = true
      valueAxis.min = 0
      valueAxis.max = scaleMax
      valueAxis.strictMinMax = true
      const bgColor = this.chartData.sum > this.chartData.budget ? '#a73c3c' : '#369e49'
      this.createRange(valueAxis, 0, scaleMax, am4core.color(bgColor))

      /* Create series */
      const series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueX = 'value'
      series.dataFields.categoryY = 'category'
      series.columns.template.fill = am4core.color('#000')
      // series.columns.template.stroke = am4core.color("#fff");
      series.columns.template.strokeWidth = 0
      // series.columns.template.strokeOpacity = 1;
      series.columns.template.height = am4core.percent(20)
      series.columns.template.tooltipText = '{value}'

      const series2 = chart.series.push(new am4charts.LineSeries())
      series2.dataFields.valueX = 'target'
      series2.dataFields.categoryY = 'category'
      series2.strokeWidth = 0

      const bullet = series2.bullets.push(new am4charts.Bullet())
      const line = bullet.createChild(am4core.Line)
      line.x1 = 0
      line.y1 = -20
      line.x2 = 0
      line.y2 = 20
      line.stroke = am4core.color('#000')
      line.strokeWidth = 3

      this.chart = chart
    },
  },
}
</script>
