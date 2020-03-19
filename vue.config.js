// vue.config.js
module.exports = {
  "devServer": {
	  "port": 8080,
	  "disableHostCheck": true,
	  "proxy": {
		  "/api": {
			  "target": "https://geo.datav.aliyun.com/areas/bound/100000_full.json",//目标接口域名https://www.ucharts.cn/data.json
			  "changeOrigin": true,//是否跨域
			  "secure": false // 设置支持https协议的代理
		  }
	  }
   }
}