<style scoped lang="scss">
	.el-col {
	    border-radius: 4px;
	}
	
</style>
<template> 
  <div> 
  	<el-row :gutter="10" >
	  	<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(item,index) in list" :key="index">
		  	<el-card shadow="always" :body-style="{height:'17rem'}">
	      		<chart/>
	    	</el-card>
		</el-col>
	</el-row>
  </div>
</template> 

<script>
import chart from '@/components/chart.vue'
let Mock = require('mockjs')
export default {
  name: 'Home',
  data(){
  	return {
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
    chart
  },
  mounted(){
  	this.$nextTick(()=>{
  		var Random = Mock.Random
  // 		var template = {
		//     'key|1-10': '★'
		// }
  		var template = {
  			
		    name: 'value1',
		  
		}
		var data = {
		    name: 'value2',

		}
		console.log(Mock.valid(template,data))
  	})
  },
  methods:{
  	
  },
  
  computed: {
    img(){
    	return getExplorer()
    }
  },
}
</script>
