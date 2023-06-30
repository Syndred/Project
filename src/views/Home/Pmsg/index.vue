<template>
    <!-- <h1>{{ $store.state.message }}</h1> -->
    <el-card v-if="show">
        <!-- 简历表格 -->
        <el-table :data="pagedTableData" style="width: 100%" max-height="400px" class="form">
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="age" label="年龄" width="120" />
            <el-table-column prop="eBG" label="学历" width="120" />
            <el-table-column prop="school" label="毕业院校" width="200" />
            <el-table-column prop="wAge" label="工作年限" width="120" />

            <!-- 搜索框 -->
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" placeholder="关键字搜索" style="width: 200px" />
                </template>

                <!-- 编辑和删除按钮 -->
                <template #default="scope">
                    <el-button color="#336666" @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页功能 -->
        <div class="block" style="display: flex; justify-content: center; margin-top: 20px">
            <span class="total">共{{ filterTableData.length }}条</span>
            <el-pagination :current-page="currentPage" :page-size="pageSize" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" :total="filterTableData.length" layout="prev, pager, next">
            </el-pagination>
        </div>
    </el-card>

    <!-- 修改页面展示 -->
    <el-form v-else-if="!show" :model="sizeForm" :rules="rules" ref="formRef" label-width="auto" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="sizeForm.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
            <el-input v-model="sizeForm.age" />
        </el-form-item>
        <el-form-item label="学历" prop="eBG">
            <el-select v-model="sizeForm.eBG" placeholder="请选择学历">
                <el-option label="大专" value="大专"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
                <el-option label="博士" value="博士"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="毕业院校" prop="school">
            <el-input v-model="sizeForm.school" />
        </el-form-item>
        <el-form-item label="工作年限" prop="wAge">
            <el-input v-model="sizeForm.wAge" />
        </el-form-item>

        <!-- <el-form-item label="是否实习生">
      <el-select v-model="sizeForm.region" placeholder="选择">
        <el-option label="是" value="yes" />
        <el-option label="否" value="no" />
      </el-select>
    </el-form-item> -->
        <!-- <el-form-item label="性别">
      <el-radio-group v-model="sizeForm.resource">
        <el-radio border label="男" />
        <el-radio border label="女" />
      </el-radio-group>
    </el-form-item> -->
        <el-form-item>
            <el-button color="#336666" type="primary" @click="onSubmit()">保存</el-button>
            <el-button @click="backHome">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, reactive } from "vue";

// 搜索框初始化
var search = ref("");

// 初始化更新值
const sizeForm = reactive({
    id: "",
    name: "",
    age: "",
    eBG: "",
    school: "",
    wAge: "",
});

//初始化formRef
const formRef = ref(null);
//编辑规则
const checkAge = (rule, value, callback) => {
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

const rules = reactive({
    name: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
    ],
    age: [{ required: true, validator: checkAge, trigger: "change" }], // 修改为change触发
    eBG: [{ required: true, message: "请选择学历", trigger: "change" }],
    school: [
        {
            required: true,
            message: "请输入毕业院校",
            trigger: "blur",
        },
    ],
    wAge: [{ required: true, message: "请输入工作年限", trigger: "blur" }],
});

import { onMounted } from "vue";
export default {
    name: "Table",
    setup() {
        // 使用vuex仓库
        const store = useStore();
        // 拿取数据并保存到tableData中
        var tableData = ref(store.state.Resume.data);
        // var tableData = ref($store.state.message)
        // 搜索逻辑
        var filterTableData = computed(function () {
            return tableData.value.filter(function (data) {
                return (
                    !search.value ||
                    data.name.includes(search.value) ||
                    data.age.includes(search.value) ||
                    data.eBG.includes(search.value) ||
                    data.school.includes(search.value) ||
                    data.wAge.includes(search.value)
                );
            });
        });
        // 删除逻辑
        function handleDelete(row) {
            store.dispatch("del", row.id);
            // console.log(row)
        }
        //处理编辑业务
        //点击编辑按钮会将数据自动填写在更改框中
        function handleEdit(row) {
            // router.push("/edit");
            show.value = false;
            this.sizeForm.id = row.id;
            this.sizeForm.name = row.name;
            this.sizeForm.age = row.age;
            this.sizeForm.eBG = row.eBG;
            this.sizeForm.school = row.school;
            this.sizeForm.wAge = row.wAge;
            //  console.log(this.sizeForm)
        }
        //点击取消时跳转回首页
        var show = ref(true);
        function backHome() {
            show.value = true;
            // console.log(show.value);
        }
        //点击保存更新并返回展示并提交数据给vuex
        function onSubmit() {
            //表单检验
            formRef.value.validate((valid) => {
                if (valid) {
                    alert("修改成功!");
                    // console.log(sizeForm);
                    //派发数据给vuex
                    store.dispatch("update", sizeForm);
                    // 返回展示页面
                    show.value = true;
                } else {
                    console.log("录入失败,请检查");
                    return false;
                }
            });
        }

        //分页逻辑
        const currentPage = ref(1); // 当前页码
        const pageSize = ref(7); // 每页显示数量
        // 计算属性：根据当前页和每页显示数量来计算要显示的数据段
        const pagedTableData = computed(() => {
            const startIndex = (currentPage.value - 1) * pageSize.value;
            const endIndex = startIndex + pageSize.value;
            return filterTableData.value.slice(startIndex, endIndex);
        });
        // 方法：处理分页大小变化
        const handleSizeChange = (val) => {
            pageSize.value = val;
            currentPage.value = 1; // 重置当前页码为第一页
        };
        // 方法：处理当前页码变化
        const handleCurrentChange = (val) => {
            currentPage.value = val;
        };

        // onMounted(() => {
        //   store.dispatch("fetchData");
        // });

        return {
            search: search,
            handleEdit,
            filterTableData,
            handleDelete,
            show,
            onSubmit,
            sizeForm,
            rules,
            formRef,
            backHome,
            tableData,
            currentPage,
            pageSize,
            handleSizeChange,
            handleCurrentChange,
            pagedTableData,
        };
    },
};
</script>

<style scoped>
.form {
    border: 3px solid #336666;
    border-radius: 10px;
}

.total {
    display: flex;
    font-size: smaller;
    align-items: center;
    color: #afb0b3;
}
</style>
