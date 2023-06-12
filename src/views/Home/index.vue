<template>
      <!-- <div class="common-layout">
        <el-container>
          <div class="bg"></div>
        </el-container>
      </div> -->
    <div>
        <div class="common-layout">
            <el-container>
                <el-aside >
                    <SideNav></SideNav>
                </el-aside>
                <el-container>
                    <el-header>

                        <Head></Head>
                    </el-header>
                    <el-main>
                       <Main></Main>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script>
import SideNav from "./SideNav";
import Head from "./Head";
import Main from "./Main";
export default {
    components: { SideNav, Head, Main },
};
</script>

<style scoped>
.el-main {
    background-color: pink;
    overflow: auto;
    height: 93.5vh;
}
/* .bg{
    width: 100%;
    height: 50px;
  background-color: skyblue;
} */
.el-header {
    padding: 0;
}

.el-aside {
    background: #cacaca;
    width: 200px;
}</style>
