<template>
  <div>
    <div class="common-layout">
      <el-container>
        <!-- <el-aside>
          <el-row class="tac">
            <el-col>
              <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <Plus />
                    </el-icon>
                    <span>Navigator One</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon>
                      <location />
                    </el-icon>
                    <span>Navigator One</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="2-1">item one</el-menu-item>
                    <el-menu-item index="2-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="2-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="3">
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>Navigator Four</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>Navigator Four</span>
                </el-menu-item>
                <el-menu-item index="6">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>Navigator Four</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside> -->
        <el-container>
          <el-header>
            <el-menu :default-active="$route.path" :router="true" class="el-menu-demo" mode="horizontal"
              background-color="#336666" text-color="#fff" active-text-color="#80FFFF" @select="handleSelect">
              <el-menu-item index="/main" @click="toMain">简历信息</el-menu-item>
              <el-menu-item index="/enter" @click="toEnter">简历录入</el-menu-item>
              <el-menu-item index="4">岗位录入</el-menu-item>
              <el-sub-menu index="2">
                <template #title>岗位信息</template>
                <el-menu-item index="2-1">会计</el-menu-item>
                <el-menu-item index="2-2">销售</el-menu-item>
                <el-menu-item index="2-3">运营</el-menu-item>
                <el-sub-menu index="2-4">
                  <template #title>开发</template>
                  <el-menu-item index="2-4-1">UI</el-menu-item>
                  <el-menu-item index="2-4-2">前端</el-menu-item>
                  <el-menu-item index="2-4-3">后端</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const toMain = () => {
      router.push("/main");
    };
    const toEnter = () => {
      router.push("/enter");
    };

    return { handleSelect, handleOpen, handleClose, toMain, toEnter };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.el-main {
  background-color: #efefef;
  overflow: auto;
  height: 88vh;
}

.el-menu-item {
  margin-top: 1rem;
}

/* .bg{
    width: 100%;
    height: 50px;
  background-color: skyblue;
} */
.el-header {
  padding: 0;
}
</style>
