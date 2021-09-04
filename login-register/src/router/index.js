import Vue from "vue";
import VueRouter from "vue-router";
import loginOrRegister from "@/views/loginOrRegister";
import success from "@/views/success.vue"
import index from "@/views/index.vue"
import media from "@/media.vue"
import Userinfo from "@/views/Userinfo";
import Upload from "@/views/Upload";
import Welcome from "@/views/Welcome";
import About from "@/views/About";
import Txtrecognize from '@/views/Txtrecognize'
import Imgrecognize from '@/views/Imgrecognize'

Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: index,
    name: "index",
    meta: {
      judge: true //判断登录状态
    },

    children: [{
        path: "/loginOrRegister",
        component: loginOrRegister,
        name: 'loginOrRegister'
      },
      {
        path: "/success/:id",//添加id 防止刷新后丢失页面
        component: success,
        name: "success",
        meta: {
          judge: true //判断登录状态
        },
      },
      {
        path:'/media',
        component:media,
      },
       {
      path: '/userinfo',
      name: 'userinfo',
      component: Userinfo
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
      

    ]
  },
]

var router = new VueRouter({
  routes
})
export default router;