import Vue from "vue";
import VueRouter from "vue-router";
import loginOrRegister from "@/views/loginOrRegister";
import success from "@/views/success.vue"
import index from "@/views/index.vue"

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
    ]
  },
]

var router = new VueRouter({
  routes
})
export default router;