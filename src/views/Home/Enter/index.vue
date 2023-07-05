<template>
    <!-- 上传与识别简历 -->
    <el-upload class="upload-demo" action="http://192.168.1.107:8080/api/upload" :on-success="handleSuccess" drag multiple>
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
            <el-button color="#336666" type="primary" plain @click="submitForm('ruleForm')">录入</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
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
        };
    },
    methods: {
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
            this.ruleForm.name = response.name
            this.ruleForm.age = response.age
            this.ruleForm.eBG = response.eBG
            this.ruleForm.school = response.school
            this.ruleForm.wAge = response.wAge
            this.ruleForm.jobName = response.jobName
        },

        // 重置功能
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
    },
};
</script>

<style>
/* .el-main{
    background-color: #336666;
} */
</style>
