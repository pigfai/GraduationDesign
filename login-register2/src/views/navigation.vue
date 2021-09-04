<template>
  <div class="top-box">
    <div class="tag" v-show="!islogin">
      <router-link :to="{name : 'loginOrRegister'}"> <el-button class="button" type="primary">登录/注册</el-button>
      </router-link>
    </div>
    <div class="tag" v-show="islogin">{{name}}</div>
    <div class="tag" v-show="islogin">
      <el-button class="button" type="primary" @click="exit">退出登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "navigation",
  data() {
    return {
      name: "",
      islogin: false
    };
  },
  mounted() {
    this.enter();
    this.$router.beforeEach((to, from, next) => {
      /* 路由发生变化时相应变化 */
      if (to.meta.judge) {
        this.enter();
      }
      next();
    });
  },
  methods: {
    enter() {
      let that = this;
      if (
        window.sessionStorage.getItem("done") != undefined &&
        window.sessionStorage.getItem("done") == "login"
      ) {
        that.islogin = true;
        that.name = window.sessionStorage.getItem("user");
      }
      else if( window.sessionStorage.getItem("done") == "register"){
        console.log("注册成功！")
      }
      else
        that.islogin = false;
    },
    exit() {
      window.sessionStorage.removeItem("done");
      window.sessionStorage.removeItem("user");
      this.$router.push("/");
    }
  }
};
</script>
<style>
.top-box {
  float: right;
  min-width: 500px;
  padding-right: 50px;
}
.button {
  margin-left: 10px;
}
.tag {
  display: inline-block;
  margin: 10px 50px;
}
</style>