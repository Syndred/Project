<template>
  <el-row v-if="show === 1" class="row" justify="center" style="margin-top: 8vh" :gutter="40">
    <!-- 简历信息录入显示 -->
    <el-col :span="8">
      <span class="font-active">简历信息录入</span>
      <el-icon color="#5a5a7f" :size="20">
        <Switch />
      </el-icon>
      <span class="font" @click="changePost">岗位信息录入</span>
      <el-card style="height: 40rem">
        <!-- 上传与识别简历 -->
<<<<<<< HEAD
        <el-upload class="upload-demo" action=" https://7648-113-100-10-5.ngrok-free.app/api/uploadStep" :on-success="handleSuccess"
=======
        <el-upload class="upload-demo" action="http://10.200.62.119:8080/api/uploadStep" :on-success="handleSuccess"
>>>>>>> 6de3bebb0a3c825949a5d38ee73ff4d1fe7367ea
          :data="addData" :before-upload="handleUping" drag :show-file-list="false">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽上传或<em>选择文件</em></div>
          <template #tip>
            <div class="el-upload__tip">支持DOCX、JPEG/PNG图片格式简历录入</div>
          </template>
        </el-upload>

        <br />

        <!-- 录入简历结构 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历" prop="eBG">
            <el-select v-model="ruleForm.eBG" placeholder="请选择学历">
              <el-option label="专科" value="专科"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校" prop="school">
            <el-input v-model="ruleForm.school"></el-input>
          </el-form-item>
          <el-form-item label="工作年限" prop="wAge">
            <el-input v-model="ruleForm.wAge"></el-input>
          </el-form-item>
          <el-form-item label="求职目标" prop="jobName">
            <el-input v-model="ruleForm.jobName"></el-input>
          </el-form-item>
          <!-- 底部按钮 -->
          <el-form-item>
            <el-button color="#6378b6" type="primary" plain @click="submitForm('ruleForm')">录入</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <span @click="compare" class="tip" v-show="showTip">查看识别结果？</span>
        </el-form>
      </el-card>
    </el-col>
    <!-- 原数据对照显示 -->
    <el-col :span="6" class="transition-box" v-show="uploaded">
      <span class="font-active">识别结果</span>
      <el-card class="compare">
        <el-scrollbar height="39rem">
          <pre class="backend-data">{{ rawText }}</pre>
        </el-scrollbar>
      </el-card>
    </el-col>
    <!-- 切换岗位信息录入 -->
  </el-row>
  <el-row v-else-if="show === 2" class="row" justify="center" style="margin-top: 8vh" :gutter="40">
    <el-col :span="8">
      <span class="font-active">岗位信息录入</span>
      <el-icon color="#5a5a7f" :size="20">
        <Switch />
      </el-icon>
      <span class="font" @click="changeResume">简历信息录入</span>
      <el-card>
        <el-carousel direction="vertical" type="card" :autoplay="true" class="carousel">
          <el-carousel-item v-for="item in $store.state.PostMsg.data" :key="item.label">
            <h3 text="xl" justify="center">{{ item.label }}</h3>
          </el-carousel-item>
        </el-carousel>

        <el-form :model="PruleForm" :rules="Prules" ref="PruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="岗位名称" prop="postName">
            <el-input v-model="PruleForm.postName"></el-input>
          </el-form-item>
          <el-form-item label="岗位描述" prop="pdescription">
            <el-input v-model="PruleForm.pdescription" type="textarea" :autosize="{ minRows: 6 }"></el-input>
          </el-form-item>
          <!-- 底部按钮 -->
          <el-form-item>
            <el-button color="#6378b6" type="primary" @click="PsubmitForm('PruleForm')">录入</el-button>
            <el-button @click="PresetForm('PruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
  <!-- 简历信息录入显示(加入对照) -->
</template>

<script>
import { nanoid } from "nanoid";
import { ElNotification, ElMessage } from "element-plus";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      const ageRegex = /^\d+$/;
      // 使用正则表达式验证输入是否是数字
      if (!ageRegex.test(value)) {
        return callback(new Error("请输入数字"));
      }
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (value < 16 || value > 80) {
          callback(new Error("年龄不符合规范"));
        } else {
          callback();
        }
      }, 500);
    };
    var checkwAge = (rule, value, callback) => {
      const ageRegex = /^\d+$/;
      // 使用正则表达式验证输入是否是数字
      if (!ageRegex.test(value)) {
        return callback(new Error("请输入数字"));
      }
      if (!value) {
        return callback(new Error("工作年限不能为空"));
      }
      setTimeout(() => {
        if (value < 0 || value > 80) {
          callback(new Error("年龄不符合规范"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      // 当有简历上传到后端时先附加id
      addData: {
        id: "",
      },
      // 展示
      show: 1,
      // 上传完成后对照显示
      uploaded: false,
      // 提示信息显示
      showTip: false,
      // 初始化识别原文
      rawText: "",
      // 简历录入规则
      ruleForm: {
        id: "",
        name: "",
        age: "",
        eBG: "",
        sex: "",
        school: "",
        wAge: "",
        jobName: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        age: [{ required: true, validator: checkAge, trigger: "change" }], // 修改为change触发
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        eBG: [{ required: true, message: "请选择学历", trigger: "change" }],
        school: [
          {
            required: true,
            message: "请输入毕业院校",
            trigger: "blur",
          },
          { min: 2, max: 20, message: "请输入完整信息", trigger: "blur" },
        ],
        wAge: [{ required: true, validator: checkwAge, trigger: "blur" }],
        jobName: [
          { min: 2, max: 20, message: "请输入完整信息", trigger: "blur" },
          { required: true, message: "请输入求职信息", trigger: "blur" },
        ],
      },
      // 岗位录入规则
      PruleForm: {
        postName: "",
        pdescription: "",
        id: "",
      },
      Prules: {
        postName: [
          { required: true, message: "请输入岗位名称", trigger: "blur" },
        ],
        pdescription: [
          { required: true, message: "请输入岗位描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 切换录入展示
    changePost() {
      this.show = 2;
    },
    changeResume() {
      this.show = 1;
    },
    // 提交逻辑
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 添加id字段
          // 如果之前没传过id
          if (!this.addData.id) {
            this.ruleForm.id = nanoid();
          } else {
            this.ruleForm.id = this.addData.id;
          }
          // 将数据添加到vuex中
          this.$store.dispatch("Resume/add", this.ruleForm);
          setTimeout(() => {
            if (this.$store.state.Resume.msg.Amsg) {
              ElNotification.success({
                title: "录入成功",
                offset: 100,
              });
              this.$store.commit("Resume/RESETMSG");
              this.resetForm(ruleForm);
            } else {
              ElMessage.error("录入失败！");
            }
          }, 500);
        } else {
          ElMessage.error("录入失败,请检查");
          return false;
        }
      });
    },

    // 上传简历时的钩子，用于加id
    handleUping() {
      this.addData.id = nanoid();
    },
    //上传简历拿到后端返回数据
    handleSuccess(response, file, fileList) {
      // 在这里拿到后端处理完的返回结果
      // console.log(response)
      this.showTip = true;
      this.rawText = response.jieXi[0].rawText;
      this.ruleForm.name = response.jieXi[0].name;
      this.ruleForm.age = response.jieXi[0].age;
      this.ruleForm.sex = response.jieXi[0].sex;
      this.ruleForm.eBG = response.jieXi[0].eBG;
      this.ruleForm.school = response.jieXi[0].school;
      this.ruleForm.wAge = response.jieXi[0].wAge;
      this.ruleForm.jobName = response.jieXi[0].jobName;
    },

    // 重置功能
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.ruleForm = [];
    },
    //设置原文对照
    compare() {
      this.uploaded = !this.uploaded;
    },
    // 岗位录入方法
    PsubmitForm(PruleForm) {
      this.$refs[PruleForm].validate((valid) => {
        if (valid) {
          // 添加id字段
          this.PruleForm.id = nanoid();
          // console.log(this.PruleForm)
          // 将打包的对象派发给vuex
          this.$store.dispatch("PostMsg/addpost", this.PruleForm);
          setTimeout(() => {
            if (this.$store.state.PostMsg.msg.Amsg) {
              ElNotification.success({
                title: "录入成功",
                offset: 100,
              });
              this.$store.commit("PostMsg/RESETMSG");
              this.$refs[PruleForm].resetFields();
            } else {
              ElMessage.error("录入失败！请检查是否存在相同岗位或描述");
            }
          }, 500);
        } else {
          ElMessage.error("录入失败,请检查");
          return false;
        }
      });
    },
    PresetForm(PruleForm) {
      this.$refs[PruleForm].resetFields();
    },
  },
};
</script>

<style scoped>
/* 卡片内标题 */
.font-active {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 25px;
  font-weight: bold;
  color: #32325d;
}

.font {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #dbdbe9;
}

.font:hover {
  color: #5a5a7f;
  cursor: pointer;
}

/* 对照盒子 */
.compare {
  height: 40rem;
  background-color: #fcfdff;
}

/* 岗位录入卡片样式 */
/* 走马灯 */
.carousel {
  height: 15em;
  margin: 3em 0;
}

.el-carousel__item h3 {
  color: #717ac8;
  text-align: center;
  background-color: #ffffff;
}

/* 右下角提示信息 */
.tip {
  float: right;
  position: relative;
  bottom: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1rem;
  color: #717ac8;
  cursor: pointer;
  text-decoration: underline;
}

/* 处理数据换行 */
.backend-data {
  white-space: pre-line;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #717ac8;
  font-size: 1rem;
}
</style>
