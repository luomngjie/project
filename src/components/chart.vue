<template>
  <div style="height:100%;">
   <div id="map" ref="china_map"></div>
  </div>
</template>

<script> 
  import {getExplorer,on,off} from '@/libs/tools'
export default {
  name: 'chart',
  props: {
    param: {
      type:Array,
      
    },

  },
  data(){
    return {
      china_map:null
    }
  },
  methods:{
    resize(){
      this.china_map.resize()
    },
    initEchart:function(){
      this.china_map = this.$echarts.init(this.$refs.china_map);
      let option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      }
      this.china_map.setOption(option)
      on(window,'resize',this.resize)
    }
  },
  beforeDestroy(){
    off(window,'resize',this.resize)
  },
  mounted(){
    this.$nextTick(() => {
      this.initEchart()
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #map{
    height:100%;
  }
</style>
