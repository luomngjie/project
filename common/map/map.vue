<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light" style="text-align: center;">{{textarea}}</view>
		</view>
		<view class="qiun-charts" >
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasMap" id="canvasMap" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchMap"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasMap" id="canvasMap" class="charts" @touchstart="touchMap"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaMap=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'中国地图'
			}
		},
		mounted() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData(){
				
				uni.request({
					url: 'https://geo.datav.aliyun.com/areas/bound/100000_full.json',
					data:{
					},
					success: function(res) {
						let cMap={series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						cMap.series=res.data.features;
						_self.showMap("canvasMap",cMap);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showMap(canvasId,chartData){
				canvaMap=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'map',
					fontSize:10,
					padding:[0,0,0,0],
					legend:{
						show:false
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					dataLabel:false,//地区名称
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						map: {
							border:true,
							borderWidth:1,
							borderColor:'#aaa',
							fillOpacity:0.3
						}
					}
				});
			},
			touchMap(e){
				canvaMap.showToolTip(e, {
					format: function (item) {
						return item.properties.name 
					}
				});
			}
		}
	}
</script>

<style >
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 750upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 750upx;
		background-color: #FFFFFF;
	}
</style>
