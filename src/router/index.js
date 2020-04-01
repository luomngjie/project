import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.js'

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  next()
});
router.afterEach(to=>{

})

export default router
