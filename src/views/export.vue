<style scoped lang="scss">
	
</style>
<template>
	<div>
		<div class="export">
		    <el-button  style="margin-top: 2px;" size="medium" type="success" @click="handleDownload">导出</el-button>
		</div>
		<el-table
      :data="tableData"
      style="width: 100%" id="rebateSetTable">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
	</div>
</template>
<script>
	
	export default{
		data(){
			return {
				tableData: [{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1518 弄',
		            age:"22"
		          }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1517 弄',
		            age:"22"
		          }, {
		            date: '2016-05-01',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1519 弄',
		            age:"22"
		          }, {
		            date: '2016-05-03',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1516 弄',
		            age:"22"
		          }],
		          filename: '',
			      autoWidth: true,
			      bookType: 'xlsx'
				}
		},
		methods:{
			handleDownload(){
				import('@/vendor/ExportExcel').then(excel => {
				let headers = this.tableData.map(v=>{return Object.keys(v)})
		        const tHeader = headers[0]
		        const filterVal =headers[0]
		        const list = this.tableData
		        const data = this.formatJson(filterVal, list)
		        excel.export_json_to_excel({
		          header: tHeader,//导出数据的表头
		          data,//导出的具体数据
		          filename: this.filename,//导出文件名
		          autoWidth: this.autoWidth,//单元格是否要自适应宽度=>true / false
		          bookType: this.bookType//导出文件类型=>xlsx, csv, txt,
		        })
		      })
			},
			formatJson(filterVal, jsonData) {
		      return jsonData.map(v => filterVal.map(j => {
		        if (j === 'timestamp') {
		          return parseTime(v[j])
		        } else {
		          return v[j]
		        }
		      }))
		    }
		}
	}
</script>