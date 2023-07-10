<template>
  <!-- <h1>{{ $store.state.message }}</h1> -->
  <el-row v-if="show === 1" class="row" justify="center" style="margin-top: 8vh">
    <el-col :span="16">
    <p class="rheader">简历信息</p>
      <el-card>
        <!-- 简历表格 -->
        <el-table :data="pagedTableData" style="width: 100%" max-height="400px" class="form">
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="age" label="年龄" width="120" />
          <el-table-column prop="eBG" label="学历" width="120" />
          <el-table-column prop="wAge" label="工作年限" width="120" />
          <el-table-column prop="school" label="毕业院校" width="200" />
          <el-table-column prop="jobName" label="求职目标" width="200" />

          <!-- 搜索框 -->
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" placeholder="关键字搜索" style="width: 205px" />
            </template>
            <!-- 编辑删除解析按钮 -->
            <template #default="scope">
              <el-button plain color="#6378b6" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
              <el-button type="primary" color="#4890b9"  @click="handleAnalyze(scope.row)">解析</el-button>
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
    </el-col>
  </el-row>

  <!-- 修改页面展示 -->
  <el-row v-else-if="show === 2" class="row" justify="center" style="margin-top: 12vh">
    <el-col :span="6">
      <el-card>
        <p class="header">信息编辑</p>
        <el-form :model="sizeForm" :rules="rules" ref="formRef" label-width="auto" style="margin-top: 10px">
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
          <el-form-item label="求职目标" prop="jobName">
            <el-input v-model="sizeForm.jobName" />
          </el-form-item>
          <el-form-item>
            <el-button color="#717ac8" type="primary" plain @click="onSubmit()">保存</el-button>
            <el-button @click="backHome">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

  <!-- 简历分析页面 -->
  <el-row v-if="show === 3" justify="center" style="margin-top: 6vh">
    <el-col :span="10">
      <!-- 简历分析卡片 -->
      <el-card class="analyse">
        <!-- 返回图标 -->
        <el-row>
          <el-col style="margin-bottom: 10px">
            <el-icon :size="40" color="#9aa7b1" style="cursor: pointer;">
              <Back @click="backHome" />
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
          <el-col :span="17">
            <el-row style="margin: 1.3rem 0;">
              <el-col>
                <span class="name"> 大哥大 </span>
                <span class="name"> | </span>
                <span class="job">软件工程师</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-tag class="mx-1" type="danger" effect="plain">
                  15岁
                </el-tag>
                <el-tag class="mx-1" effect="plain"> 本科 </el-tag>
                <el-tag class="mx-1" type="warning" effect="plain">
                  广东技术大学
                </el-tag>
                <el-tag class="mx-1" type="success" effect="plain">
                  1年工作经验
                </el-tag>
                <!-- <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
                  {{ item.label }}
                </el-tag> -->
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-divider />
        <!-- 专业技能标题 -->
        <el-row>
          <el-col>
            <span class="header"> 专业技能 </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <li>能吃</li>
              <li>能睡</li>
              <li>能打豆豆</li>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <li>能吃</li>
              <li>能睡</li>
              <li>能打豆豆</li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="header"> 个人经历 </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul>
              <li>上过荣耀王者</li>
              <li>一区宗师</li>
              <li>天人前一百</li>
            </ul>
          </el-col>
          </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, reactive } from "vue";
import { ElNotification } from "element-plus";
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
  jobName: "",
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
  jobName: [{ required: true, message: "请输入求职信息", trigger: "blur" }],
});

export default {
  name: "Table",
  setup() {
    // 使用vuex仓库
    const store = useStore();
    //向vuex中派发信息通知其向服务器请求数据
    store.dispatch("Resume/fetchData");
    // 拿取数据并保存到tableData中
    var tableData = computed(() => store.state.Resume.data);
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
          data.wAge.includes(search.value) ||
          data.jobName.includes(search.value)
        );
      });
    });
    // 删除逻辑
    function handleDelete(row) {
      store.dispatch("del", row.id);
      // console.log(row)
    }
    // 切换解析页面
    function handleAnalyze() {
      show.value = 3;
    }
    //处理编辑业务
    //点击编辑按钮会将数据自动填写在更改框中
    function handleEdit(row) {
      // router.push("/edit");
      show.value = 2;
      this.sizeForm.id = row.id;
      this.sizeForm.name = row.name;
      this.sizeForm.age = row.age;
      this.sizeForm.eBG = row.eBG;
      this.sizeForm.school = row.school;
      this.sizeForm.wAge = row.wAge;
      this.sizeForm.jobName = row.jobName;
      //  console.log(this.sizeForm)
    }
    //点击取消时跳转回首页
    var show = ref(1);
    function backHome() {
      show.value = 1;
      // console.log(show.value);
    }
    //点击保存更新并返回展示并提交数据给vuex
    function onSubmit() {
      //表单检验
      formRef.value.validate((valid) => {
        if (valid) {
          // alert("修改成功!");
          // console.log(sizeForm);
          //派发数据给vuex
          store.dispatch("update", sizeForm);
          //弹出提示框
          ElNotification.success({
            title: "修改成功",
            offset: 100,
          });
          // 返回展示页面
          show.value = 1;
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

    // 处理单一简历分析业务

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
      handleAnalyze,
    };
  },
};
</script>

<style scoped>
/* 修改页面标题 */
.header {
  margin: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 25px;
  font-weight: bold;
  color: #32325d;
}
.rheader {
  margin: 1rem 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 40px;
  font-weight: bold;
  color: #32325d;
  text-align: center;
  font-style: italic;
}

.form {
  /* border: 3px solid #336666; */
  border-radius: 10px;
}

.total {
  display: flex;
  font-size: smaller;
  align-items: center;
  color: #afb0b3;
}

.example-showcase .el-loading-mask {
  z-index: 9;
}

/* 单一简历分析卡片样式 */
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

/* tag右边距 */
.mx-1 {
  margin-right: 0.4rem;
}

/* li列表样式 */
li {
  line-height: 2.5rem;
  color: #32325d;
}
 ul li::marker{
            color: #717ac8;
            font-size: 1.2rem;
        }

</style>
