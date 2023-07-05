<template>
    <!-- 录入简历结构 -->
    <el-row class="row" justify="center" style="margin-top: 30vh;">
        <el-col :span="8">
            <!-- <div class="grid-content ep-bg-purple-dark head">
                <h2 class="headmsg">岗位信息与匹配</h2>
              </div> -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="岗位名称" prop="postName">
                    <el-input v-model="ruleForm.postName"></el-input>
                </el-form-item>
                <el-form-item label="岗位描述" prop="pdescription">
                    <el-input v-model="ruleForm.pdescription" type="textarea"></el-input>
                </el-form-item>
                <!-- 底部按钮 -->
                <el-form-item>
                    <el-button color="#336666" type="primary" @click="submitForm('ruleForm')">录入</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form></el-col></el-row>
</template>

<script>
import { nanoid } from "nanoid";
export default {
    data() {
        return {
            ruleForm: {
                postName: "",
                pdescription: "",
                id: "",
            },
            rules: {
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
        // 提交逻辑
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    // 添加id字段
                    this.ruleForm.id = nanoid();
                    // 将打包的对象派发给vuex
                    this.$store.dispatch("PostMsg/addpost", this.ruleForm);
                } else {
                    alert("录入失败,请检查");
                    return false;
                }
            });
        },
        // 重置功能
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
    },
};
</script>

<style></style>
