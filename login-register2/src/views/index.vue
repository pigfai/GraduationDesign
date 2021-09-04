<template>
  <div>
    <el-container class="container">
      <el-header class="top">
        <navigation></navigation>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navigation from "./navigation.vue";

export default {
  name: "index",
  components: { navigation }
};
</script>

<style>
.container{
  width: 100%;
}
.top {
  width: 100%;
  background-color: rgb(179, 218, 253);
  box-shadow: 0 2px 2px rgb(54, 54, 54);
}
</style>
