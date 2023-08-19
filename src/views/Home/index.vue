<template>
  <el-row justify="center" style="margin: 5vh 0">
    <!-- 描述简介 -->
    <el-col :span="6">
      <h2 class="headmsg">欢迎使用蓝云简历系统</h2>
      <p class="font">
        通过大数据训练模型，精准识别简历内容，提取关键字段，帮助hr一键匹配所需简历；<br />提供数据可视化，直观查看简历、学历分布、年龄分布等信息。
      </p>
      <el-button @click="toPmatch" size="large" type="primary" color="#5369d7">体验人岗匹配</el-button>
      <el-button @click="toEnter" color="#626aef" size="large" plain>体验简历识别</el-button>
    </el-col>
    <!-- 贴图 -->
    <el-col :span="6">
      <div class="img"><img src="@/assets/pic.jpeg" alt="" /></div>
    </el-col>
    <el-col :span="16"><el-divider /></el-col>
  </el-row>

  <!-- 统计 -->
  <el-row justify="center" style="margin: 5vh 0">
    <el-col :span="10" style="text-align: center">
      <el-row>
        <el-col :span="6">
          <el-statistic :value="resumeCount">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                简历总数
                <el-icon style="margin-left: 4px" :size="12">
                  <Avatar />
                </el-icon>
              </div>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="postNameCount">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                岗位总数
                <el-icon style="margin-left: 4px" :size="12">
                  <Suitcase />
                </el-icon>
              </div>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="male">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                男性总数
                <el-icon style="margin-left: 4px" :size="12">
                  <Male />
                </el-icon>
              </div>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="female">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                女性总数
                <el-icon style="margin-left: 4px" :size="12">
                  <Female />
                </el-icon>
              </div>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <!-- 柱状图和饼状图 -->
  <el-row justify="center">
    <!-- 年龄分布柱状图 -->
    <el-col :span="12" style="text-align: center" v-if="AGE">
      <Category :AGE="AGE" />
    </el-col>
    <!-- 学历和工作年限饼状图 -->
    <el-col :span="16">
      <el-row justify="center">
        <el-col :span="9" v-if="Edu">
          <Chart :Edu="Edu" />
        </el-col>
        <el-col :span="9" v-if="WorkTime">
          <ChartR :WorkTime="WorkTime" />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
import Chart from "@/components/chart";
import ChartR from "@/components/chartR";
import Category from "@/components/category";
import { ref } from "vue";
import router from "@/router";
import { useStore } from "vuex";
import { reqFindSum } from "@/api";
// 刷新首页时直接更新vuex数据
// 使用vuex仓库
const store = useStore();
//向vuex中派发信息通知其向服务器请求数据
// store.dispatch("PostMsg/fetchData");
// store.dispatch("Resume/fetchData");
const postNameCount = ref();
const resumeCount = ref();
const Edu = ref();
const WorkTime = ref();
const male = ref();
const female = ref();
const AGE = ref();

reqFindSum()
  .then((res) => {
    if (res.status == 200) {
      // console.log(res.data)
      postNameCount.value = Number(res.data.postNameCount);
      resumeCount.value = Number(res.data.resumeCount);
      male.value = Number(res.data.male);
      female.value = Number(res.data.female);
      AGE.value = res.data.AGE.map((item) => Number(item.count));
      // console.log(AGE.value)
      Edu.value = res.data.Edu.map((item) => {
        const value = Number(item.count);
        let name;
        switch (item.education) {
          case "本科":
            name = "本科";
            break;
          case "大专":
            name = "大专";
            break;
          case "硕士":
            name = "硕士";
            break;
          case "博士":
            name = "博士";
            break;
          case "其他":
            name = "其他";
            break;
          default:
            name = "";
        }
        return { value, name };
      });
      WorkTime.value = res.data.WorkTime.map((item) => {
        const value = Number(item.count);
        let name;
        switch (item.workTimeRange) {
          case "0-2":
            name = "0-2年";
            break;
          case "3-5":
            name = "3-5年";
            break;
          case "6-10":
            name = "6-10年";
            break;
          case "10以上":
            name = "10年以上";
            break;
          default:
            name = "";
        }
        return { value, name };
      });
      // console.log(Edu.value)
    }
  })
  .catch((error) => {
    console.log(error); // 这里捕获到的是错误对象
  });

//路由跳转
const toPmatch = () => {
  router.push("/pmatch");
};
const toEnter = () => {
  router.push("/enter");
};
</script>

<style scoped>
/* 介绍字体标题 */
.headmsg {
  color: #32325d;
  font-size: 30px;
}

/* 介绍字体正文 */
.font {
  font-size: 20px;
  color: #8f9eb0c8;
}

/* echarts图表样式 */
.cookie {
  text-align: center;
  height: 30rem;
}

/* 图片样式 */
.img img {
  /* width: 10rem; */
  height: 11rem;
  object-fit: contain;
  border-radius: 1rem;
}

.img {
  text-align: center;
}

/* row对齐方式 */
.el-row {
  align-items: center;
}
</style>
