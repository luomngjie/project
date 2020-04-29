/**
 * 自定义封装axios
 * 可携带token
 */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
const service = axios.create({
	baseURL:process.env.VUE_APP_BASE_API,// url = base url + request url
	timeout: 5000,//超时
});
/*
 * 请求拦截
 */
service.interceptors.request.use(
	config=>{
		if(store.state.token){//设置请求头携带token
			config.headers['X-Token'] = '3215151212121544512124'
		}
		return config;
},	error=>{
	// do something with request error
    console.log(error) // for debug
    return Promise.reject(new Error( 'Error'))
})
/**
 *响应拦截
 *  *
 */
service.interceptors.response.use(
	response=>{
		const res = response.data;
		if(res.status != 0){
			if (res.code === 50008 || res.code === 50012 || res.code === 50014){
				 MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
		          confirmButtonText: 'Re-Login',
		          cancelButtonText: 'Cancel',
		          type: 'warning'
		        	}).then(() => {
		           store.dispatch('setToken').then(() => {
		            this.reload()
		          })
		        })
			}
			return ''
			//return Promise.reject(new Error(res.message || 'Error'))
		}else{
			// Message({
			// 	type:"success",
			// 	message:res.message || '请求成功',
			// 	duration: 5 * 1000
			// })
			return {
				code:0,
				data:res,
				message:"请求成功"
			}
		}
	},
	error=>{
		console.log('err' + error) // for debug
	    Message({
	      message: error.message,
	      type: 'error',
	      duration: 5 * 1000
	    })
	    return Promise.reject(error)
	}
)
export default service