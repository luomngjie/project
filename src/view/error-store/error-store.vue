<template>
  <div>
    <div class="top">
       <Input v-model="searchName" placeholder="请输入搜索地址" clearable style="width: 300px;margin-bottom: 10px;" @input="search"/>
       <p>当前位置:{{address}}</p>
        <p>当前经纬度:经度(longitude:{{mapSet[0]}}),纬度(latitude:{{mapSet[1]}})</p>
    </div>

    <div class="map" id="map" ref="map"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      amap: null,
      ion: require('../../../public/yellowL.png'),
      searchName: '',
      poiArr: [], // 搜索地图渲染的数据
      address: '重庆', // 选中位置
      marker: [], // 标记点
      windowsArr: [],
      mapSet: [106.54, 29.59]// 定位中心点 默认经纬度
    }
  },

  created () {

    // this.getLocation()
  },

  mounted () {
    this.$nextTick(() => {
      this.mapInit()
      this.getLocation()
    })
  },

  methods: {
    /** 地图初始化**/
    mapInit () {
      const self = this
      self.amap = new AMap.Map('map', {
        defaultCursor: 'pointer',
        center: self.mapSet, // 地图中心点
        zoom: 10, // 地图显示的缩放级别
        resizeEnable: true // 是否监控地图容器尺寸变化
        // mapStyle: 'amap://styles/darkblue' // 地图样式
      })
      const marker = new AMap.Marker({
        position: self.amap.getCenter(),
        icon: self.ion
      })
      marker.setMap(self.amap)
      AMap.event.addListener(self.amap, 'click', self.markerClick)
    },
    /* 实现定位***/
    getLocation () {
      const self = this
      AMap.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          GeoLocationFirst: true, // 是否使用高的精度定位 默认为 true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true, // 定位按钮的排放位置, RB表示右下
          buttonPosition: 'RB'
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)
        function onComplete (data) {
          // data是具体的定位信息
          self.mapSet[1] = data.position.lat
          self.mapSet[0] = data.position.lng
          // self.mapInit()
          // console.log(self.mapSet)
          self.amap = new AMap.Map('map', {
            defaultCursor: 'pointer',
            center: self.mapSet, // 地图中心点
            zoom: 12, // 地图显示的缩放级别
            resizeEnable: true // 是否监控地图容器尺寸变化
            // mapStyle: 'amap://styles/darkblue' // 地图样式
          })
          const marker = new AMap.Marker({
            position: self.amap.getCenter(),
            icon: self.ion
          })
          marker.setMap(self.amap)
          AMap.event.addListener(self.amap, 'click', self.markerClick)
          self.address = data.formattedAddress
          // console.log(data)
        }

        function onError (data) {
          // 定位出错
          console.log('定位失败错误：', data)
          // 调用ip定位
          self.getLngLatLocation()
        }
      })
    },

    /** 点击地图加入marker**/
    markerClick (data) {
      const self = this
      self.amap.clearMap() // 清除地图上所有添加的覆盖物
      let marker = new AMap.Marker({
        position: data.lnglat,
        icon: self.ion
      })
      self.mapSet[1] = data.lnglat.lat
      self.mapSet[0] = data.lnglat.lng
      // AMap.event.addListener(marker, "click", ()=>{
      //   new AMap.InfoWindow({
      //     content:"<h3>" + '当前选中地址' + "</h3>" + self.address,
      //     size: new AMap.Size(300, 0),
      //     autoMove: true,
      //     offset: new AMap.Pixel(4, -30)
      //   }).open(self.amap,self.mapSet)
      // })
      marker.setMap(self.amap)
      self.getAddress()
    },

    // 经纬度转化为详细地址
    getAddress () {
      const self = this
      AMap.plugin('AMap.Geocoder', (e) => {
        let geocoder = new AMap.Geocoder({
          radius: 100,
          extensions: 'all'
        })
        geocoder.getAddress(self.mapSet, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            self.address = result.regeocode.formattedAddress
            new AMap.InfoWindow({
              content: result.regeocode.formattedAddress,
              size: new AMap.Size(300, 0),
              autoMove: true,
              offset: new AMap.Pixel(4, -30)
            }).open(self.amap, self.mapSet)
            // that.placeSearch(that.address)
          }
        })
      })
    },

    // 根据名字地址去搜索结果
    placeSearch (search) {
      const self = this
      let MSearch
      AMap.plugin(['AMap.PlaceSearch', 'AMap.ToolBar', 'AMap.Scale'], () => {
        // self.amap.addControl(new AMap.ToolBar())
        // self.amap.addControl(new AMap.Scale())
        MSearch = new AMap.PlaceSearch({
          // 构造地点查询类
          city: search // 城市
        })
        AMap.event.addListener(MSearch, 'complete', self.keywordSearch_CallBack) // 返回地点查询结果
        MSearch.search(search) // 关键字查询
      })
    },
    // 结果的回调
    keywordSearch_CallBack (data) {
      var poiArr = data.poiList.pois
      var resultCount = poiArr.length
      this.poiArr = poiArr // 左边要渲染的数据
      for (var i = 0; i < resultCount; i++) {
        this.addmarker(i, poiArr[i])
        // console.log(poiArr[i])
        this.poiArr[i].url = this.poiArr[i].photos ? this.poiArr[i].photos[0] ? this.poiArr[i].photos[0].url : '' : ''
      }
      this.amap.setFitView()
    },

    /** *搜索 */
    search (e) {
      // this.address = e
      this.windowsArr = []
      this.marker = []
      // this.centerMap = []
      // this.amap=null
      this.mapInit()
      // this.amap=null
      this.placeSearch(e)
    },

    /** 添加搜索出来的marker**/
    addmarker (i, d) {
      const self = this
      let lngX = d.location.getLng()
      let latY = d.location.getLat()
      var markerOption = {
        map: this.amap,
        position: new AMap.LngLat(lngX, latY),
        icon: new AMap.Icon({
          image: self.ion,
          size: new AMap.Size(72, 72), // 图标大小
          imageSize: new AMap.Size(72, 72)
        })
      }
      var mar = new AMap.Marker(markerOption)
      this.marker.push(new AMap.LngLat(lngX, latY))
      var infoWindow = new AMap.InfoWindow({
        content: '<h3>' + '当前选中位置：' + d.name + '</h3>' + this.TipContents(d.name, d.address),
        size: new AMap.Size(300, 0),
        autoMove: true
      })
      this.windowsArr.push(infoWindow)
      let aa = (e) => {
        this.clickType = 2
        var obj = mar.getPosition()
        this.map = obj // 这里保存的地址经纬度
        this.address = d.name + d.address // 这里保存的是地址名字
        infoWindow.open(self.amap, obj)
      }
      AMap.event.addListener(mar, 'click', aa)
    },

    TipContents (name, address) {
      // 窗体内容
      if (
        name === '' ||
        name === 'undefined' ||
        name === null ||
        name === ' undefined' ||
        typeof name === 'undefined'
      ) {
        type = '暂无'
      }
      if (
        address === '' ||
        address === 'undefined' ||
        address === null ||
        address === ' undefined' ||
        typeof address === 'undefined'
      ) {
        address = '暂无'
      }
      var str = `地址：${address}`
      return str
    },

    openMarkerTipById (pointid, event) {
      // 根据id 打开搜索结果点tip
      this.clickType = 1
      event.currentTarget.style.background = '#CAE1FF'
      this.selectedIndex = pointid
      // this.map = this.marker[pointid]
      this.map1 = this.poiArr[pointid].location
      console.log(222, this.mapObj, this.marker[pointid])
      console.log(this.marker[pointid], this.poiArr[pointid])
      this.address = this.poiArr[pointid].address + this.poiArr[pointid].name
      this.windowsArr[pointid].open(this.mapObj, this.marker[pointid])
    },
    onmouseout_MarkerStyle (pointid, event) {
      // 鼠标移开后点样式恢复
      event.currentTarget.style.background = ''
    }
  }

}
</script>

<style scoped lang="less">
.top{display: flex;flex-direction: column;margin-bottom: 10px;}
.map{width: 100%;height: 750px;}
</style>
