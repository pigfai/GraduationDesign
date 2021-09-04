import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Video from "./views/Video";
import Userinfo from "./views/Userinfo";
import Userinfo2 from "./views/Userinfo2";
import Txtrecognize from "./views/Txtrecognize";
import Imgrecognize from './views/Imgrecognize'
import Upload from "./views/Upload";
import login from "./views/login";
import success from "./views/success"
import blockchaindata from "./views/blockchaindata"
import transfer from "./views/setfeeTransfer"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
//  meta: {
 //     judge: true //判断登录状态
  //  },
  routes: [
    {
      path: '/',
      name: 'video',
      component: Video
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: Userinfo
    },
    {
      path: '/userinfo2',
      name: 'userinfo2',
      component: Userinfo2
    },
    {
      path: '/txtrecognize',
      name: 'txtrecognize',
      component: Txtrecognize
    },
    {
      path: '/imgrecognize',
      name: 'imgrecognize',
      component: Imgrecognize
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/success/:id',
      name: 'success',
      component: success,
      meta: {
      judge: true //判断登录状态
      },
    },
    {
      path: '/blockchaindata',
      name: 'blockchaindata',
      component: blockchaindata
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: transfer
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
