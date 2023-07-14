<template>
  <el-row style="margin-top: 20px" :gutter="40">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark head">
        <h2 class="headmsg">岗位信息与匹配</h2>
      </div>
    </el-col>
    <el-col :span="6" :offset="6" class="transition-box1" :class="{ show: showBox }">
      <div class="grid-content ep-bg-purple">
        <el-card v-if="showCard">
          <p class="font">岗位名称</p>
          <el-select v-model="value" clearable filterable placeholder="请选择" class="select" @change="handleSelectChange"
            @clear="handleClear">
            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value" />
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
          <!-- 设置返回 -->
          <div class="back" @click="back">
            <el-icon :size="20">
              <ArrowLeft />
            </el-icon>
            <span>Back</span>
          </div>
          <el-form :model="options">
            <el-form-item>
              <p class="editfont">岗位名称</p>
              <el-input v-model="Flabel" placeholder="请输入岗位名称" class="select"></el-input>
            </el-form-item>
            <el-form-item>
              <p class="editfont">岗位描述</p>
              <el-input type="textarea" :autosize="{ minRows: 15.5, maxRows: 4 }" v-model="Fvalue"
                placeholder="请输入岗位描述"></el-input>
            </el-form-item>
            <el-row class="btn">
              <el-button color="#6378b6" type="primary" @click="submitForm">保存修改</el-button>
              <el-button type="danger" @click="delPost">删除岗位</el-button>
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
              <span class="highlight">{{item.total_score}}</span>
            </div>
            <el-divider style="margin: 3px 0" />
            <span class="name">{{ item.name }}</span>
            <span style="margin: 10px">|</span>
            <span class="name">{{ item.wAge }}年工作经验</span>
            <div class="tag">
              <el-tag> {{ item.sex }} </el-tag>
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
  name: "Pmatch",
  setup() {
    // 使用vuex仓库
    const store = useStore();
    // 拿取数据并保存
    let ResumeMsg = computed(() => store.state.Resume.data);
    let options = computed(() => store.state.PostMsg.data);
        // 设置评分
    const ratevalue = ref(4.5);
    
    const value = ref("");
    const label = ref("");
    const id = ref("");
    // 修改页面绑定的value值
    const Fvalue = ref("");
    const Flabel = ref("");
    const showBox = ref(false);
    // console.log(ratevalue.value)
    function toggleBox() {
      showBox.value = !showBox.value;
      // console.log(resumeFilter.value)
      // console.log(matchedCount.value)
    }
    // 监听选项改变获取label值
    function handleSelectChange(value) {
      const selectedOption = options.value.find((item) => item.value === value);
      if (selectedOption) {
        label.value = selectedOption.label;
        id.value = selectedOption.id;
        // console.log(id.value)
      }
    }

    // 使用名字匹配过滤简历
    const resumeFilter = computed(() => {
      return ResumeMsg.value.filter(function (data) {
        return (
          !label.value ||
          label.value === "" ||
          data.jobName.includes(label.value)
        );
      });
    });
    // 计算匹配的字符串个数
    // const matchedCount = computed(() => {
    //   return resumeFilter.value.map((data) => {
    //     const jobNameCount = data.jobName.split(label.value).length - 1;
    //     const labelCount = label.value.split(data.jobName).length - 1;
    //     console.log(jobNameCount, labelCount, resumeFilter.value)
    //     return labelCount > 0 ? jobNameCount / labelCount : 0;
    //   });
    // });

    // 清除筛选
    const handleClear = () => {
      label.value = "";
    };

    //     const calculateScore = computed(() => {
    //   const matchCount = value.value.split('').reduce((count, char) => {
    //     if (this.label.includes(char)) {
    //       return count + 1;
    //     } else {
    //       return count;
    //     }
    //   }, 0);

    //   if (matchCount === this.label.length) {
    //     return 100;
    //   } else if (matchCount === 1) {
    //     return 80;
    //   } else if (matchCount === 2) {
    //     return 90;
    //   } else if (matchCount === 3) {
    //     return 95;
    //   } else {
    //     return 0;
    //   }
    // });
    //初始化修改简历页面
    const showCard = ref(true);
    // 简历修改按钮
    const changePost = () => {
      showCard.value = false;
      showBox.value = false;
      Fvalue.value = value.value;
      Flabel.value = label.value;
    };
    // 提交岗位修改
    const submitForm = () => {
      // 表单验证通过，执行提交操作
      const formData = {
        label: Flabel.value,
        id: id.value,
        value: Fvalue.value,
      };

      // console.log(value.value,formData.value);
      // console.log(options.value, formData.label);
      // 排空
      if (formData.label !== "" && formData.value !== "") {
        // 检查是否存在相同的名称/描述
        const exists = options.value.some(
          (option) =>
            (option.label === formData.label && option.id !== formData.id) ||
            (option.value === formData.value && option.id !== formData.id)
        );
        if (exists) {
          alert("已存在相同的名称/描述");
        } else {
          store.dispatch("PostMsg/update", formData);
          value.value = "";
          label.value = "";
          showCard.value = true;
        }
      } else {
        alert("选项不能为空");
      }
    };

    // 删除岗位信息
    const delPost = () => {
      store.dispatch("PostMsg/del", id.value);
      value.value = "";
      label.value = "";
      showCard.value = true;
    };
    // 返回逻辑
    const back = () => {
      showCard.value = true;
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
      submitForm,
      changePost,
      handleSelectChange,
      delPost,
      handleClear,
      back,
      Fvalue,
      Flabel,
      id,
      // matchedCount
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

/* 返回按钮 */
.back {
  display: flex;
  justify-content: start;
  color: #b4b4cc;
  font-style: italic;
  font-weight: bold;
  cursor: pointer;
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
