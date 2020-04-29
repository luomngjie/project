import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import axios from '@/vendor/request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    userInfo:null
  },
  mutations: {
    setState(state,{name,value}){//commit('setState', { name: 'usertypes', value: ret.data });=>调用方法
      if (!name) {
        throw new Error('invalid store name')
      }
      Vue.set(state,name,value);
    },
    setToken(state,value){
      if(value) state.token = value;
    }
  },
  actions: {
  	async callRaw({state,commit},options){
  		let resp = await axios(options)

        return resp.data
  	},
  	async call({dispatch},options){
      options.method = "POST"
  		// options.transformRequest = [(data) => {
    //     let arr = []
    //     for (let n in data) {
    //         switch (typeof data[n]) {
    //             case 'bigint':
    //             case 'number':
    //             case 'string':
    //                 arr.push(n + '=' + encodeURIComponent(data[n].toString()))
    //                 break
    //             default:
                    
    //                 if (!options.data[n]) {
    //                     arr.push(n + '=')
    //                 }
    //                 else if (options.data[n] instanceof Date) {
    //                     arr.push(n + '=' + encodeURIComponent(data[n].toString()))
    //                 }
    //                 else {
    //                     arr.push(n + '=' + encodeURIComponent(JSON.stringify(data[n])))
    //                 }
    //                 break
    //         }
    //     }
    //     return arr.join('&')
    //   }]
      let ret = await dispatch('callRaw', options);
      return ret;
      //return ret
      // if (ret.errcode === 10002) {
      //     //token无效或过期
      //     if ($router.currentRoute.path !== '/login') {
      //         $router.replace('/login?back=' + encodeURIComponent($router.currentRoute.fullPath))
      //         throw 'token expired'
      //     }
      // }
      // else {
      //     if (options.todo) {
      //         dispatch('getTodoList')
      //     }
      // }
  	}
  },
  modules: {
  }
})
