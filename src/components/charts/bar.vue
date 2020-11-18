<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String,
    isRow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler (newVal, oldVal) {
        if (newVal) {
          this.dom.setOption(newVal)
        } else {
          this.dom.setOption(oldVal)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let xAxisData = Object.keys(this.value)
      let seriesData = Object.values(this.value)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        grid: {
          top: '10%',
          left: this.isRow ? '10%' : '1%',
          right: this.isRow ? '2%' : '10%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          transitionDuration: 0,
          trigger: 'axis',
          formatter: '{b}:{c}',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: this.isRow ? 'value' : 'category',
          // type: 'category',
          data: this.isRow ? [] : xAxisData,
          axisLabel: {
            margin: 10,
            interval: 0, // 横轴信息全部显示
            // rotate: -30, //-15度角倾斜显示
            textStyle: {
              fontSize: 15,
              color: '#333'
            }
          }
        },
        yAxis: {
          type: this.isRow ? 'category' : 'value',
          data: this.isRow ? xAxisData : [],
          inverse: false, // 是否翻转
          axisLabel: {
            margin: 10,
            interval: 0, // 代表显示所有x轴标签显示
            textStyle: {
              fontSize: 15,
              color: '#333'
            }
          }

        },
        series: [{
          data: seriesData,
          barMinHeight: 25, // 最小柱高
          barWidth: 25,
          barMaxWidth: 100, // 最大柱宽度
          type: 'bar'
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
