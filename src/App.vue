<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="$route.path"
          :router="true"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#6b7c93"
          active-text-color="#717ac8"
        >
          <div class="logo" @click="toIndex">
            <img src="@/assets/cloud.png" alt="" />
            <h2 class="name">蓝云简历</h2>
          </div>
          <el-menu-item index="/rmsg">简历信息</el-menu-item>
          <el-menu-item index="/pmatch">人岗匹配</el-menu-item>
          <el-menu-item index="/enter">信息录入</el-menu-item>
          
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import router from './router';

export default {
  setup() {
    const toIndex=() => {
      router.push('/')
    }
    return {
      toIndex
    }
  },

};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
/* header下面的整体样式 */
.el-main {
  background-color: #ffffff;
  overflow: auto;
  height: 88vh;
}
/* 选项按钮样式 */
.el-menu-item {
  margin-top: 1rem;
  font-size: 18px;
  font-weight: bold;
}
/* logo盒子样式 */
.logo {
  display: flex;
  align-items: center;
  margin-right: 50vh;
  cursor: pointer;
}
/* logo盒子图片样式 */
.logo img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 10px;
}
/* logo盒子文字样式 */
.name {
  font-style: italic;
  color: rgb(83, 105, 215);
}
.el-menu-demo {

  background-color: rgb(255, 255, 255);
justify-content: center;
}
</style>
