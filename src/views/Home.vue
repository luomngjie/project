<style scoped lang="scss">
	.el-col {
	    border-radius: 4px;
	}
	
</style>
<template> 
  <div>  
  	<el-form>
	  	<el-date-picker v-model="value" type="monthrange"></el-date-picker>
	    <el-button @click="aaa">默认按钮</el-button>
	</el-form>
	<el-button v-for="tab in tabs" :key="tab" @click="currentTab = tab">默认按钮</el-button>
    <component :is="currentTab"></component>
	<!-- <scroll-text /> -->
  	<!-- <el-row :gutter="10" >
	  	<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(item,index) in list" :key="index">
		  	<el-card shadow="always" :body-style="{height:'17rem'}">
	      		<chart/>
	    	</el-card>
		</el-col>
	</el-row> -->
  </div>
</template> 

<script>
import chart from '@/components/chart.vue'
import scrollText from '@/components/scrollflow.vue'
import tablePlan from '@/components/table.vue'
import { Throttle } from'@/libs/tools'
import { shopsList } from '@/libs/mock'
//const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
const promiseCache = new Map();
export default {
	inject: ['reload'], // 引入方法
	name: 'Home',
	data(){
	  	return {
	  		value:"",
	  		timer:null,
	  		parame:[],
	  		currentTab: "A",
	  		tabs: ['A','B'],
	  		lastTime:'',
	  		searchInput: '',
	  		datas: ["16.67%", "16.67%", "66.67%", "", "", ""],
	  		state:true,
	  		list:[
		        {
		          id:"1",
		          name:"和金额库"
		        },
		        {
		          id:"2",
		          name:"heku1"
		        },
		        {
		          id:"3",
		          name:"何苦呢"
		        },
	      ]
	  	}
	},
	components: {
		// tablePlan
		// scrollText
	    // chart
	},
  	mounted(){
  		this.datas.unshift(4);
  		this.getWares();
  	},
 	methods:{
 		aaa(){
 			console.log(this.value)
 		},
 		async getWares(){
 			const key = 'dates';
 			let promiseD = promiseCache.get(key);
 			if(!promiseD){
 				promiseD = await this.$store.dispatch('call',{
	 				url:'/api/goods'
	 			});
	 			promiseCache.set(key,promiseD);
	 			//console.log(promiseD)
 			}
 		}
  	},
  
  	computed: {
	    
  	},
}
</script>
