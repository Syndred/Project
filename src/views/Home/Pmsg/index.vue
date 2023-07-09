<template>
  <el-row style="margin-top: 50px" :gutter="40">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark head">
        <h2 class="headmsg">岗位信息与匹配</h2>
      </div>
    </el-col>
    <el-col :span="6" :offset="6" class="transition-box1" :class="{ show: showBox }">
      <div class="grid-content ep-bg-purple">
        <el-card v-if="showCard">
          <p class="font">岗位名称</p>
          <el-select v-model="value" clearable filterable placeholder="请选择" class="select" @change="handleSelectChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
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
            <el-button color="#6378b6" type="primary" plain @click="changePost">修改岗位</el-button>
            <el-button color="#6378b6" type="primary" @click="toggleBox">简历匹配</el-button></el-row>
        </el-card>
        <el-card v-if="!showCard">
          <el-form :model="options" :rules="rules" ref="formRef">
            <el-form-item prop="label">
              <p class="editfont">岗位名称</p>
              <el-input v-model="label" clearable placeholder="请输入岗位名称" class="select"></el-input>
            </el-form-item>
            <el-form-item prop="value">
              <p class="editfont">岗位描述</p>
              <el-input type="textarea" :autosize="{ minRows: 17 }" v-model="value" placeholder="请输入岗位描述"></el-input>
            </el-form-item>
            <el-row class="btn">
              <el-button color="#6378b6" type="primary" plain @click="submitForm">保存修改</el-button>
              
            </el-row>
          </el-form>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6" class="transition-box" :class="{ show: showBox }">
      <div class="grid-content ep-bg-purple">
        <el-scrollbar height="600px">
          <el-card shadow="hover" style="margin-bottom: 13px" v-for="item in resumeFilter" :key="item.id" class="card">
            <div class="rhead">
              <div>
                <h3 class="resume">{{ item.jobName }}</h3>
                <el-rate v-model="ratevalue" disabled />
              </div>

              <span class="highlight">4</span>
            </div>
            <el-divider style="margin: 3px 0" />
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
    // const ResumeMsg = reactive(store.state.PostMsg.Mdata);

    // console.log(ResumeMsg)
    // 拿取岗位仓库数据并保存到options中
    const options = reactive(store.state.PostMsg.data);
    const value = ref("");
    const label = ref("");
    const showBox = ref(false);
    function toggleBox() {
      showBox.value = !showBox.value;
    }
    // 监听选项改变获取label值
    function handleSelectChange(value) {
      const selectedOption = options.find((item) => item.value === value);
      if (selectedOption) {
        label.value = selectedOption.label;
        // store.dispatch("PostMsg/matchingPost",label.value);
        // console.log(label.value)
        //console.log(value)
      }
    }
  
    // 使用名字匹配过滤简历
    const resumeFilter = computed(() => {
      return ResumeMsg.filter(function (data) {
        return (
          !label.value ||
          label.value === "" ||
          data.jobName.includes(label.value)
        );
      });
    });
    // 设置评分
    const ratevalue = ref(4)
    //初始化修改简历页面
    const showCard = ref(true)
    // 简历修改按钮
    const changePost = () => {
      showCard.value = false
    }
    // 简历修改表单
    const rules = {
      jobName: [
        { required: true, message: '请输入岗位名称', trigger: 'blur' }
      ],
      jobDescription: [
        { required: true, message: '请输入岗位描述', trigger: 'blur' }
      ]
    };

    const formRef = ref(null);

    const submitForm = () => {
      formRef.value.validate(valid => {
        if (valid) {
          // 表单验证通过，执行提交操作
          showCard.value = true
          // console.log('提交表单', form.value);
        }
      });
    };

    
    return {
      value,
      label,
      options,
      ResumeMsg,
      showBox,
      toggleBox,
      resumeFilter,
      ratevalue,
      showCard,
      rules,
      formRef,
      submitForm,
      changePost,
      handleSelectChange
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

/* 卡片内标题 */
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

.tag>* {
  margin: 10px 10px 0px 0px;
}

/* 姓名和工作年限显示样式 */
.name {
  font-weight: 600;
  color: #717ac8;
}

/* 设置高亮 */
.highlight {
  color: rgb(255, 127, 127);
  font-weight: bold;
  font-style: italic;
  display: inline;
}

/* 设置评分 */
.rhead {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 修改岗位信息标题 */
.editfont {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #32325d;
  margin: 0.5rem 0;
}

/* 盒子过渡动画 */
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
