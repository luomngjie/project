const Mock = require('mockjs');
const data = Mock.mock({
	'shops|10-100':[
		{
			"shopId|+1": 1,
			"shopMsg": "@ctitle(10)",
			"shopName": "@cname",//生成商品名 ， 都是中国人的名字
	        "shopTel": /^1(5|3|7|8)[0-9]{9}$/,//生成随机电话号
	        "shopAddress": "@county(true)", //随机生成地址
	        "shopStar|1-5": "★", //随机生成1-5个星星
	        "salesVolume|30-1000": 30, //随机生成商品价格 在30-1000之间
	        "shopLogo": "@Image('100x40','#c33', '#ffffff','小北鼻')", //生成随机图片，大小/背景色/字体颜色/文字信息
	        'food|7':[
	        	{
	        		"foodName": "@cname", //food的名字
	                "foodPic": "@Image('100x40','#c33', '#ffffff','小可爱')",//生成随机图片，大小/背景色/字体颜色/文字信息
	                "foodPrice|1-100": 20,//生成1-100的随机数
	                "aname|14": [
	                    { 
	                        "aname": "@cname", 
	                        "aprice|30-60": 20 
	                    }
	                ]
	        	}
	        ]
		}
	]
});
const userDate = Mock.mock({
	"user|10-30": [
		{
			'name': '@cname', //中文名称
			'age|1-100': 100, //100以内随机整数
			'birthday': '@date("yyyy-MM-dd")', //日期
			'city': '@city(true)' //中国城市
		}
	]
})
export default[
	{
		url:"/api/goods",
		type: 'post',
		response:config=>{
			return {
				status: 0,
			    data: data,
			    message: '请求成功'
			}
		}
	},
	{
		url:"/api/user",
		type: 'post',
		response:config=>{
			return {
				status: 0,
			    data: userDate,
			    message: '请求成功'
			}
		}
	},
]