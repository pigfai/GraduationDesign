<template>
  <div class="login">
    <el-container>
      <el-main>
        <el-input v-model="name" placeholder="请输入用户名" class="inputBox"></el-input>
        <el-input type="password" v-model="pw" placeholder="请输入密码" class="inputBox"></el-input>
        <el-button type="success" @click="register">注册</el-button>
        <el-button type="success" @click="login">登录</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "login",
  data() {
    return {
      name: "",
      pw: ""
    };
  },
  mounted() {
    //侦测登录/注册后的状态
    this.watching();
  },
  methods: {
    // 封装的ajax方法
    ajax(method, url, val) {
      // 方法，路径，传送数据
      let that = this;
      let name = this.name;
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            Message(xhr.responseText);
            if (xhr.responseText == "登录成功") {
              window.sessionStorage.setItem("user", name);
              
              window.sessionStorage.setItem("done", "login"); //记录操作为登录
            } else if (xhr.responseText == "注册成功") {
              window.sessionStorage.setItem("user", name);
              window.sessionStorage.setItem("done", "register"); //记录操作为注册状态
            }
            that.watching();
          } else {
            console.log("Request was unsuccessful: " + xhr.status);
          }
        }
      };
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(val);
    },
    login() {
      let data = "name=" + this.name + "&" + "pw=" + this.pw;
      this.ajax("POST", "http://127.0.0.1:3021/login", data);
    },
    register() {
      let data = "name=" + this.name + "&" + "pw=" + this.pw;
      this.ajax("POST", "http://127.0.0.1:3021/register", data);
    },
    watching() {
      if (window.sessionStorage.getItem("done") != undefined) {
        let status = window.sessionStorage.getItem("done");
        if (status == "login")
          this.$router.push({
            name: "success",
            params: {
              id: "1"
            }
          });
        else if (status == "register")
          this.$router.push({
            name: "success",
            params: {
              id: "0"
            }
          });
      }
    }
  }
};
</script>