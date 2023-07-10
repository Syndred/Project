<template>
    <el-row v-if="show === 1" class="row" justify="center" style="margin-top: 8vh">
        <!-- 简历信息录入显示 -->
        <el-col :span="8">
            <span class="font-active">简历信息录入</span>
            <el-icon color="#5a5a7f" :size="20">
                <Switch />
            </el-icon>
            <span class="font" @click="changePost">岗位信息录入</span>
            <el-card>
                <!-- 上传与识别简历 -->
                <el-upload class="upload-demo" action="http://192.168.1.107:8080/api/upload" :on-success="handleSuccess"
                    drag multiple>
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
                    <el-form-item label="学历" prop="eBG">
                        <el-select v-model="ruleForm.eBG" placeholder="请选择学历">
                            <el-option label="大专及以下" value="大专及以下"></el-option>
                            <el-option label="本科" value="本科"></el-option>
                            <el-option label="研究生" value="研究生"></el-option>
                            <el-option label="博士及以上" value="博士及以上"></el-option>
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
                </el-form>
            </el-card>
        </el-col>
    </el-row>
    <el-row v-else-if="show === 2" class="row" justify="center" style="margin-top: 8vh">
        <el-col :span="8">
            <span class="font-active">岗位信息录入</span>
            <el-icon color="#5a5a7f" :size="20">
                <Switch />
            </el-icon>
            <span class="font" @click="changeResume">简历信息录入</span>
            <el-card style="height: 628px">
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
    <el-row :gutter="30" v-if="show === 3" class="row" justify="center" style="margin-top: 8vh">
        <el-col :span="6">
            <span class="font-active">简历信息录入</span>
            <el-icon color="#5a5a7f" :size="20">
                <Switch />
            </el-icon>
            <span class="font" @click="changePost">岗位信息录入</span>
            <el-card>
                <!-- 上传与识别简历 -->
                <el-upload class="upload-demo" action="http://192.168.1.107:8080/api/upload" :on-success="handleSuccess"
                    drag multiple>
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">拖拽上传或<em>选择文件</em></div>
                    <template #tip>
                        <div class="el-upload__tip">
                            支持DOCX、JPEG/PNG图片格式简历录入
                        </div>
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
                    <el-form-item label="学历" prop="eBG">
                        <el-select v-model="ruleForm.eBG" placeholder="请选择学历">
                            <el-option label="大专" value="大专"></el-option>
                            <el-option label="本科" value="本科"></el-option>
                            <el-option label="研究生" value="研究生"></el-option>
                            <el-option label="博士" value="博士"></el-option>
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
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="6">
        <span class="font-active">原数据</span>
        <el-card class="compare"></el-card>
        </el-col>
    </el-row>
</template>

<script>
import { nanoid } from "nanoid";
import { ElNotification } from "element-plus";
// import store from '@/store';
export default {
    data() {
        var checkAge = (rule, value, callback) => {
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
        return {
            show: 1,
            // 简历录入规则
            ruleForm: {
                id: "",
                name: "",
                age: "",
                eBG: "",
                school: "",
                wAge: "",
                jobName: "",
            },
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
                ],
                age: [{ required: true, validator: checkAge, trigger: "blur" }],
                eBG: [{ required: true, message: "请选择学历", trigger: "change" }],
                school: [
                    {
                        required: true,
                        message: "请输入毕业院校",
                        trigger: "blur",
                    },
                ],
                wAge: [{ required: true, message: "请输入工作年限", trigger: "blur" }],
                jobName: [
                    { required: true, message: "请输入求职目标", trigger: "blur" },
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
                    this.ruleForm.id = nanoid();
                    // 将数据添加到vuex中
                    this.$store.dispatch("Resume/add", this.ruleForm);
                    ElNotification.success({
                        title: "录入成功",
                        offset: 100,
                    });
                } else {
                    alert("录入失败,请检查");
                    return false;
                }
            });
        },

        //上传简历拿到后端返回数据
        handleSuccess(response, file, fileList) {
            // 在这里拿到后端处理完的返回结果
            console.log(response);
            this.ruleForm.name = response.name;
            this.ruleForm.age = response.age;
            this.ruleForm.eBG = response.eBG;
            this.ruleForm.school = response.school;
            this.ruleForm.wAge = response.wAge;
            this.ruleForm.jobName = response.jobName;
        },

        // 重置功能
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
            this.show = 3;
        },
        // 岗位录入方法
        PsubmitForm(PruleForm) {
            this.$refs[PruleForm].validate((valid) => {
                if (valid) {
                    // 添加id字段
                    this.PruleForm.id = nanoid();
                    // 将打包的对象派发给vuex
                    this.$store.dispatch("PostMsg/addpost", this.PruleForm);
                } else {
                    alert("录入失败,请检查");
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
.compare{
    height: 39.2rem;
    background-color: #f7faff;
    /* margin-top: 2rem; */
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


</style>
