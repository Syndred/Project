<template>
  <!-- 简历分析页面 -->
  <el-row justify="center" style="margin-top: 6vh">
    <el-col :span="12">
      <!-- 简历分析卡片 -->
      <el-card class="analyse">
        <!-- 返回图标 -->
        <el-row>
          <el-col style="margin-bottom: 10px">
            <el-icon :size="40" color="#9aa7b1" style="cursor: pointer">
              <Back @click="$emit('backHome')" />
            </el-icon>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <!-- 头像和小标签 -->
          <el-col :span="5">
            <div class="headSculpture">
              <img src="@/assets/head.png" alt="" />
            </div>
          </el-col>
          <el-col
            :span="17"
            v-if="data1.value.name"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
            "
          >
            <el-row>
              <el-col>
                <span class="name"> {{ data1.value.name }} </span>
                <span class="name"> | </span>
                <span class="job">{{ data1.value.jobName }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-tag class="mx-1" effect="plain">
                  {{ data1.value.sex }}
                </el-tag>
                <el-tag class="mx-1" type="danger" effect="plain">
                  {{ data1.value.age }}岁
                </el-tag>
                <el-tag class="mx-1" type="success" effect="plain">
                  {{ data1.value.school }}
                </el-tag>
                <el-tag class="mx-1" type="info" effect="dark">
                  {{ data1.value.eBG }}
                </el-tag>
                <el-tag class="mx-1" type="warning" effect="plain">
                  {{ data1.value.wAge }}年工作经验
                </el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-divider />
        <!-- 基本信息 -->
        <el-row>
          <el-col>
            <span class="header"> 基本信息 </span>
          </el-col>
        </el-row>
        <el-row v-for="(B, index) in data.value.BS_msg" :key="index">
          <el-col :span="12">
            <ul>
              <li>姓名: {{ B.BS_name }}</li>
              <li>年龄: {{ B.BS_age }}</li>
              <li>性别: {{ B.BS_gender }}</li>
              <li>身高: {{ B.BS_height }}</li>
              <li>体重: {{ B.BS_weight }}</li>
              <li>生日: {{ B.BS_birthday }}</li>
              <li>学历: {{ B.BS_degree }}</li>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <li>手机: {{ B.BS_phone }}</li>
              <li>家乡: {{ B.BS_hometown }}</li>
              <li>毕业院校: {{ B.BS_college }}</li>
              <li>专业: {{ B.BS_major }}</li>
              <li>毕业时间: {{ B.BS_grad_time }}</li>
              <li>求职目标: {{ B.BS_jobName }}</li>
              <li>工作年限: {{ B.BS_work_year }}</li>
            </ul>
          </el-col>
        </el-row>

        <!-- 工作经历 -->
        <el-row>
          <el-col>
            <span class="header"> 工作经历 </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div v-for="(E, index) in data.value.job_exp_objs" :key="index">
              <p class="header2">{{ E.start_date }}-{{ E.end_date }}</p>
              <ul>
                <li>地点:{{ E.job_cpy }}</li>
                <li>时长:{{ E.job_duration }}</li>
                <li>职位:{{ E.job_position }}</li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive } from "vue";
import { reqAnalysis } from "@/api";

const data = reactive({ value: {} });
const data1 = reactive({ value: {} });
const props = defineProps(["id"]);
// console.log(props.id)
reqAnalysis(props.id)
  .then((res) => {
    data.value = JSON.parse(res.data.analysisJson);
    data1.value = res.data;
    // console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
</script>

<style scoped>
/* 单一简历分析卡片样式 */
/* 标题 */
.header {
  margin: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 25px;
  font-weight: bold;
  color: #32325d;
}

.header2 {
  margin: 1.1rem 0 0 1.1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #3c3c93;
}

.analyse {
  background-color: rgb(255, 255, 255);
}

/* 头像框样式 */
.headSculpture {
  height: auto;
  margin-left: 10px;
}

.headSculpture img {
  width: 100%;
  object-fit: contain;
}

/* 名字 */
.name {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #32325d;
}

/* 工作 */
.job {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 2rem;
  /* font-style: italic; */
  color: #6b7c93;
}

.el-tag--dark.el-tag--info {
  border: #f0a8ee 1px solid;
  background-color: #fff;
  color: #f0a8ee !important;
}

/* tag右边距 */
.mx-1 {
  margin-right: 0.4rem;
}

/* li列表样式 */
li {
  line-height: 2.5rem;
  color: #32325d;
}

ul li::marker {
  color: #717ac8;
  font-size: 1.2rem;
}
</style>
