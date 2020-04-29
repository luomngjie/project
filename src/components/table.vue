<template>
	<div>
		<el-table style="width: 100%" border :data="tableData">
		  <template v-for="(item,index) in tableHead">
		    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>
		  </template>
		</el-table>
	</div>
</template>
<script>
	export default{
		data() {
	      return {
	      	tableData:[
	      		{
	      			column_name:"何苦",
	      			column_age:24,
	      			column_sex:"男",
	      			column_time:"6-7"
	      		},
	      		{
	      			column_name:"何苦",
	      			column_age:24,
	      			column_sex:"男",
	      			column_time:"5-6"
	      		},
	      		{
	      			column_name:"何苦",
	      			column_age:24,
	      			column_sex:"男",
	      			column_time:"4-5"
	      		},
	      		{
	      			column_name:"何苦",
	      			column_age:24,
	      			column_sex:"男",
	      			column_time:"3-4"
	      		},
	      		{
	      			column_name:"何苦",
	      			column_age:24,
	      			column_sex:"男",
	      			column_time:"2-3"
	      		},
	      		{
	      			column_name:"何苦",
	      			column_age:24,
	      			column_sex:"男",
	      			column_time:"1-2"
	      		},
	      		{
	      			column_name:"何苦",
	      			column_age:24,
	      			column_sex:"男",
	      			column_time:"0-1"
	      		},
	      	],
	        tableHead:[
			   

			],
			nowHour: '',		//当前小时
			HourList: [],
	      }
	    },
	    mounted(){
	    	this.nowHour= this.getHour(); 
			//钟点时间 24小时
			var hoursObj = {},datas = [];
			for(var i = 0; i < 60; i+=5) {
				hoursObj = i; 
				datas.push({
					column_comment:hoursObj+'-'+(hoursObj>60?hoursObj=60:hoursObj+5),
					column_name:"column_name",
				})
			}
			this.tableHead = datas
            console.log(this.tableHead)
	    },
	    methods:{
	    	getHour(){
	    		let h = new Date().getHours();
	    		let m = new Date().getMinutes();

	    		if(m > 1){
					h = h+1;
				}
				return h
	    	},
	 
	    }
	}
</script>
<style>
	
</style>