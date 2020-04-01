/**JS**/
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts' // 引入echarts中国地图数据
require('echarts/map/js/china')

/**CSS**/
import 'element-ui/lib/theme-chalk/index.css'

/***组件使用***/
Vue.use(ElementUI);

/**实例挂载***/
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

