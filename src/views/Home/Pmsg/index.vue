<template>
  <el-row style="margin-top: 50px" :gutter="40">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark head">
        <h2 class="headmsg">岗位信息与匹配</h2>
      </div>
    </el-col>
    <el-col
      :span="6"
      :offset="6"
      class="transition-box1"
      :class="{ show: showBox }"
    >
      <div class="grid-content ep-bg-purple">
        <el-card>
          <p class="font">岗位名称</p>
          <el-select
            v-model="value"
            clearable
            filterable
            placeholder="请选择"
            class="select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <p class="font">岗位描述</p>
          <el-card class="box-card" shadow="never">
            <el-scrollbar height="300px">
              <p style="white-space: pre-wrap">
                {{ value }}
              </p>
            </el-scrollbar>
          </el-card>
          <el-row class="btn">
            <el-button type="primary" plain>修改岗位</el-button>
            <el-button type="primary" @click="toggleBox"
              >简历匹配</el-button
            ></el-row
          >
        </el-card>
      </div>
    </el-col>
    <el-col :span="6" class="transition-box" :class="{ show: showBox }">
      <div class="grid-content ep-bg-purple">
        <el-scrollbar height="600px">
          <el-card
            shadow="hover"
            style="margin-bottom: 13px"
            v-for="item in ResumeMsg"
            :key="item.id"
            class="card"
          >
            <h3 class="resume">{{ item.jobName }}</h3>
            <el-divider style="margin: 10px 0" />
            <span class="name">{{ item.name }}</span>
            <span style="margin: 10px">|</span>
            <span class="name">{{ item.wAge }}年工作经验</span>
            <div class="tag">
              <el-tag> {{ item.school }} </el-tag>
              <el-tag> {{ item.eBG }} </el-tag>
              <el-tag> {{ item.age }}岁 </el-tag>
            </div>
          </el-card>
        </el-scrollbar>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { useStore } from "vuex";
import { ref, reactive, computed } from "vue";

export default {
  name: "Pmsg",
  setup() {
    // 使用vuex仓库
    const store = useStore();
    // 拿取简历仓库数据并保存到ResumeMsg中
    const ResumeMsg = reactive(store.state.Resume.data);
    // console.log(ResumeMsg)
    // 拿取岗位仓库数据并保存到options中
    const options = reactive(store.state.PostMsg.data);
    const value = ref("");
    const label = ref("");
    const showBox = ref(false);
    function toggleBox() {
      showBox.value = !showBox.value;
    }
    let postCard = ref("6");
    // 使用名字匹配过滤简历（没成功，还是采取数据库形式过滤吧）
    // const resumeFilter = computed(() => {
    //    return ResumeMsg.filter(function (data) {
    //         return (
    //             !options.label ||
    //             options.some(item => data.jobName.includes(item.label))
    //         );
    //     });
    // });
    // console.log(resumeFilter,value,label)
    return {
      value,
      label,
      options,
      ResumeMsg,
      showBox,
      toggleBox,
      postCard,
    };
  },
};
</script>

<style scoped>
.headmsg {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #32325d;
  font-size: 40px;
}
.font {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #32325d;
}
/* 左侧选择下拉框 */
.select {
  width: 100%;
}
/* 左侧显示框 */
.box-card {
  background-color: #f6f9fc;
}
.head {
  text-align: center;
  margin-top: 50px;
}
/* 设置右侧简历卡片样式 */
.card {
  background-color: #ffffff;
  border: solid 1px #e0eaf1;
}
.btn {
  margin-top: 20px;
  justify-content: space-around;
}
/* 右侧岗位标题 */
.resume {
  margin: 0;
  color: #32325d;
}
.tag > * {
  margin: 10px 10px 0px 0px;
}
/* 姓名和工作年限显示样式 */
.name {
  font-weight: 600;
  color: #717ac8;
}
.transition-box {
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.3s, transform 0.3s;
}

.transition-box.show {
  opacity: 1;
  transform: translateX(0);
}

.transition-box1 {
  /* opacity: 5; */
  transform: translateX(50%);
  transition: transform 0.3s;
}

.transition-box1.show {
  /* opacity: 0; */
  transform: translateX(0);
}
</style>
