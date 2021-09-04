<template>
  <div class="success">
    <el-container>
      <el-main>
        <div class="messageBox">
          <span>欢迎用户</span>
          <span>{{name}}，</span>
          <span>{{msg}}</span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Message } from "element-ui";

export default {
  name: "home",
  data() {
    return {
      name: "",
      msg: ""
    };
  },
  created() {
    if(window.sessionStorage.getItem("done")){
    //1为登录成功界面，0位注册成功界面
    if (this.$route.params.id == "1") 
      this.msg = "登录成功!"
    else if (this.$route.params.id == "0") 
      this.msg = "注册成功!"
    this.name = window.sessionStorage.getItem("user");
    window.sessionStorage.removeItem("done")  //用完就删除
    }
    else 
      this.$router.push("/");
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 90px;
  text-align: center;
}
.messageBox {
  margin: 0 auto;
  display: block;
  width: 250px;
}
</style>