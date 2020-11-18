<template>
  <div class="contran">
    <template v-if="false">
      <Card shadow>
        <Row>
          <i-col span="4">
            <Button @click="createTagParams">添加一个标签</Button>
          </i-col>
          <i-col span="20">
            <p>动态路由，添加params</p>
          </i-col>
        </Row>
      </Card>
      <Card shadow style="margin-top: 10px;">
        <Row>
          <i-col span="4">
            <Button @click="createTagQuery">添加一个标签</Button>
          </i-col>
          <i-col span="20">
            <p>动态路由，添加query</p>
          </i-col>
        </Row>
      </Card>
      <Card shadow style="margin-top: 10px;">
        <Row>
          <i-col span="4">
            <Button @click="handleCloseTag">关闭工具方法页</Button>
          </i-col>
          <i-col span="20">
            <p>手动关闭页面</p>
          </i-col>
        </Row>
      </Card>
    </template>

      <Row :gutter="20" >
        <i-col :xs="24" :md="24" :lg="6" :xl="6" :xxl="6">
          <div class="main-item">
            <div class="main-item-list box">
              <chart-pie style="height: 100%;" :value="pieData" text="用户访问来源"></chart-pie>
            </div>
            <div class="main-item-list box">
              <example style="height: 310px;"/>
            </div>
            <div class="main-item-list box">
              <chart-pie style="height: 100%;" :value="pieData" text="用户访问来源"></chart-pie>
            </div>
          </div>
        </i-col>
        <i-col :xs="24" :md="24" :lg="12" :xl="12" :xxl="12">
          <div class="main-item">
<!--            <aMap :reContry = "true"></aMap>-->
            <div class="main-item-top box map" id="map"></div>
            <div class="main-item-center">
              <div class="main-item-center-b box">
                <chart-pie style="height: 100%;" :value="pieData" text="用户访问来源"></chart-pie>
              </div>
              <div class="main-item-center-b box">
                <chart-bar style="height:100%;" :value="barData" text="每周用户活跃量"/>
              </div>
            </div>
          </div>
        </i-col>
        <i-col :xs="24" :md="24" :lg="6" :xl="6" :xxl="6">
          <div class="main-item">
            <div class="main-item-list box">
              <chart-pie style="height: 100%;" :value="pieData" text="用户访问来源"></chart-pie>
            </div>
            <div class="main-item-list box">
              <chart-bar style="height:100%;" :value="barData" text="每周用户活跃量" :isRow="true"/>
            </div>
            <div class="main-item-list box">
              <chart-pie style="height: 100%;" :value="pieData" text="用户访问来源"></chart-pie>
            </div>
          </div>
        </i-col>
      </Row>
    {{timer}}
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { ChartPie, ChartBar, example } from '_c/charts'
import { aMap } from '_c/aMap'
export default {
  name: 'tools_methods_page',
  components: {
    ChartPie,
    ChartBar,
    example,
    aMap
  },
  data () {
    return {
      reContry: true, // reContry是下钻
      timer: null,
      pieData: [
        { value: Math.floor(Math.random() * 100), name: '直接访问' },
        { value: Math.floor(Math.random() * 100), name: '邮件营销' },
        { value: Math.floor(Math.random() * 100), name: '联盟广告' },
        { value: Math.floor(Math.random() * 100), name: '视频广告' },
        { value: Math.floor(Math.random() * 100), name: '搜索引擎' }
      ],
      barData: {
        Mon: Math.floor(Math.random() * 10000),
        Tue: Math.floor(Math.random() * 10000),
        Wed: Math.floor(Math.random() * 10000),
        Thu: Math.floor(Math.random() * 10000),
        Fri: Math.floor(Math.random() * 10000),
        Sat: Math.floor(Math.random() * 10000),
        Sun: Math.floor(Math.random() * 10000)
      }
    }
  },
  created () {

  },
  mounted () {
    this.mapInit()
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    createTagParams () {
      const id = parseInt(Math.random() * 100000)
      const route = {
        name: 'params',
        params: {
          id
        },
        meta: {
          title: `动态路由-${id}`
        }
      }
      this.$router.push(route)
    },
    createTagQuery () {
      const id = parseInt(Math.random() * 100000)
      const route = {
        name: 'query',
        query: {
          id
        },
        meta: {
          title: `参数-${id}`
        }
      }
      this.$router.push(route)
    },
    handleCloseTag () {
      this.closeTag({
        name: 'tools_methods_page'
      })
    },
    /** 返回全国**/
    returnCountry () {
      this.reContry = true
      setTimeout(() => {
        this.reContry = false
      }, 500)
    },
    // 加载行政区域
    areaBG (map, cityName) {
      AMap.service('AMap.DistrictSearch', function () {
        let opts = {
          subdistrict: 1, // 返回下一级行政区
          extensions: 'all', // 返回行政区边界坐标组等具体信息
          level: 'city' // 查询行政级别为市
        }
        // 实例化DistrictSearch
        let district = new AMap.DistrictSearch(opts)
        district.setLevel('district')
        // 行政区查询
        district.search(`${cityName}`, function (status, result) {
          // 获取边界信息

          let bounds = result.districtList[0].boundaries
          let polygons = []
          if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
              // 生成行政区划polygon
              let polygon = new AMap.Polygon({
                map: map,
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.2,
                fillColor: 'rgba(71,228,194,0.44)',
                strokeColor: 'rgba(83,204,79,0.65)'
              })
              polygons.push(polygon)
            }
          }
        })
      })
    },
    // 初始化地图，并加载行政区域
    mapInit () {
      let map = new AMap.Map('map', {
        center: [105.397428, 35.90923],
        mapStyle: 'amap://styles/darkblue', // "amap://styles/bfb1bb3feb0db7082367abca96b8d214", // 设置地图的显示样式
        zoom: 4
      })
      // 行政区域加载
      let cities = ['北京市', '郑州市', '西安市', '呼和浩特', '辽宁省', '重庆', '四川']
      for (let i = 0; i < cities.length; i++) {
        this.areaBG(map, cities[i])
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .box{
    margin-bottom: 5px;
    border:1px solid #2682FF;
    box-shadow: 0px 0px 10px #1F304D inset;
    background: linear-gradient(to left, rgba(38,130,255, 1), rgba(38,130,255, 1)) left top no-repeat,
    linear-gradient(to bottom, rgba(38,130,255, 1), rgba(38,130,255, 1)) left top no-repeat,
    linear-gradient(to left, rgba(38,130,255, 1), rgba(38,130,255, 1)) right top no-repeat,
    linear-gradient(to bottom, rgba(38,130,255, 1), rgba(38,130,255, 1)) right top no-repeat,
    linear-gradient(to left, rgba(38,130,255, 1), rgba(38,130,255, 1)) left bottom no-repeat,
    linear-gradient(to bottom, rgba(38,130,255, 1), rgba(38,130,255, 1)) left bottom no-repeat,
    linear-gradient(to left, rgba(38,130,255, 1), rgba(38,130,255, 1)) right bottom no-repeat,
    linear-gradient(to left, rgba(38,130,255, 1), rgba(38,130,255, 1)) right bottom no-repeat;
    background-size: 2px 20px,20px 2px
  }
  .contran{
    .main{
      &-item{
        &-list{
          height:270px;
        }
        &-top{
          height:545px;
        }
        &-center{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          &-b{
            width: 400px;height:270px;
          }
        }
      }
    }
    .mapp {
      width: 95%;
      height: 100%;
      //min-height: 810px;
      z-index: 2;
    }
    .map{
      //min-height: 810px;
    }
  }

</style>
