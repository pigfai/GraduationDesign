import Vue from 'vue'  
import Router from 'vue-router'  
import login from '@/components/login' //加载组件login
Vue.use(Router)
export default new Router({
routes: [
   {
     path: '/',
     component: login
   }
  ]
})
