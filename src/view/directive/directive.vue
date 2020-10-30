<!-- <template>
  <div>
    <Row>
      <i-col>
        <Card>
          <Row>
            <i-col span="8">
              <Button type="primary" @click="showModal">显示可拖动弹窗</Button>
              <br/>
              <Button v-draggable="buttonOptions" class="draggable-btn">这个按钮也是可以拖动的</Button>
            </i-col>
            <i-col span="16">
              <div class="intro-con">
                &lt;Modal v-draggable="options" v-model="visible"&gt;标题&lt;/Modal&gt;
                <pre class="code-con">
    options = {
      trigger: '.ivu-modal-body',
      body: '.ivu-modal'
    }
                </pre>
              </div>
            </i-col>
          </Row>
        </Card>
      </i-col>
      <Modal v-draggable="options" v-model="modalVisible">
        拖动这里即可拖动整个弹窗
      </Modal>
    </Row>
    <Row style="margin-top: 10px;">
      <i-col>
        <Card>
          <Row>
            <i-col span="8">
              <Input style="width: 60%" v-model="inputValue">
                <Button slot="append" v-clipboard="clipOptions">copy</Button>
              </Input>
            </i-col>
            <i-col span="16">
              <div class="intro-con">
                &lt;Input style="width: 60%" v-model="inputValue"&gt;
                  <br/>
                  &nbsp;&nbsp;&nbsp;&lt;Button slot="append" v-clipboard="clipOptions"&gt;copy&lt;/Button&gt;
                  <br/>
                &lt;/Input&gt;
                <pre class="code-con">
    clipOptions: {
      value: this.inputValue,
      success: (e) => {
        this.$Message.success('复制成功')
      },
      error: () => {
        this.$Message.error('复制失败')
      }
    }
                </pre>
              </div>
            </i-col>
          </Row>
        </Card>
      </i-col>
      <Modal v-draggable="options" v-model="modalVisible">
        拖动这里即可拖动整个弹窗
      </Modal>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      modalVisible: false,
      options: {
        trigger: '.ivu-modal-body',
        body: '.ivu-modal',
        recover: true
      },
      buttonOptions: {
        trigger: '.draggable-btn',
        body: '.draggable-btn'
      },
      statu: 1,
      inputValue: '这是输入的内容'
    }
  },
  computed: {
    clipOptions () {
      return {
        value: this.inputValue,
        success: (e) => {
          this.$Message.success('复制成功')
        },
        error: () => {
          this.$Message.error('复制失败')
        }
      }
    }
  },
  methods: {
    showModal () {
      this.modalVisible = true
    }
  }
}
</script>

<style>
.intro-con{
  min-height: 140px;
}
.draggable-btn{
  margin-top: 20px;
}
.code-con{
  width: 400px;
  background: #F9F9F9;
  padding-top: 10px;
}
</style>
 <button @click="returnCountry">返回全国</button>
  <div class="mapp">
   <aMap :reContry="reContry"></aMap>
 </div>
 -->

 <template>
   <div class="content">
     <div class="map" id="map"></div>
   </div>

 </template>

<script>
import { aMap } from '_c/aMap'
export default{
  components: { aMap }, // 引入注册
  data () {
    return {
      reContry: true// reContry是下钻
    }
  },

  methods: {
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
        zoom: 5
      })
      // 行政区域加载
      let cities = ['北京市', '郑州市', '西安市', '呼和浩特', '辽宁省', '重庆', '四川']
      for (let i = 0; i < cities.length; i++) {
        this.areaBG(map, cities[i])
      }
    }
  },

  mounted () {
    this.mapInit()
  }
}
</script>

 <style lang="less" scoped="">
   .content{
     .mapp {
         width: 200vw;
         height: 300vw;
         //min-height: 810px;
         z-index: 2;
       }
     .map{
       min-height: 810px;
     }
   }

 </style>
