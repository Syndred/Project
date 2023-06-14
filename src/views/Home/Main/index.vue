<template>
  <!-- <h1>{{ $store.state.message }}</h1> -->
  <!-- 简历表格 -->
  <el-table v-if="show" :data="filterTableData" style="width: 100%" height="300px" class="form">
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="age" label="年龄" width="120" />
    <el-table-column prop="eBG" label="学历" width="120" />
    <el-table-column prop="school" label="毕业院校" width="200" />
    <el-table-column prop="wAge" label="工作年限" width="120" />

    <!-- 搜索框 -->
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="middle" placeholder="关键字搜索" style="width: 200px" />
      </template>

      <!-- 编辑和删除按钮 -->
      <template #default="scope">
        <el-button color="#336666" size="middle" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button size="middle" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 修改页面展示 -->
  <el-form v-else-if="!show" ref="form" :model="sizeForm" label-width="auto">
    <el-form-item label="姓名">
      <el-input v-model="sizeForm.cname" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="sizeForm.cage" />
    </el-form-item>
    <el-form-item label="学历">
      <el-input v-model="sizeForm.ceBG" />
    </el-form-item>
    <el-form-item label="毕业院校">
      <el-input v-model="sizeForm.cschool" />
    </el-form-item>
    <el-form-item label="工作年限">
      <el-input v-model="sizeForm.cwAge" />
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
import { useRouter } from "vue-router";

// 搜索框初始化
var search = ref("");

// 初始化更新值
const sizeForm = reactive({
  cname: "",
  cage: "",
  ceBG: "",
  cschool: "",
  cwAge: "",
});

export default {
  name: "Table",
  setup() {
    // 使用vuex仓库
    const store = useStore();
    // 拿去数据并保存到tableData中
    var tableData = ref(store.state.message);
    // var tableData = ref($store.state.message)
    // 搜索逻辑
    var filterTableData = computed(function () {
      return tableData.value.filter(function (data) {
        return (
          !search.value ||
          data.name.includes(search.value.toLowerCase()) ||
          data.age.includes(search.value.toLowerCase()) ||
          data.eBG.includes(search.value.toLowerCase()) ||
          data.school.includes(search.value.toLowerCase()) ||
          data.wAge.includes(search.value.toLowerCase())
        );
      });
    });
    // 删除逻辑
    function handleDelete(index) {
      tableData.value.splice(index, 1);
    }
    //处理编辑业务
    function handleEdit(row) {
      // router.push("/edit");
      this.show = false;
      // const sizeForm = this.sizeForm
      this.sizeForm.cname = row.name;
      this.sizeForm.cage = row.age;
      this.sizeForm.ceBG = row.eBG;
      this.sizeForm.cschool = row.school;
      this.sizeForm.cwAge = row.wAge;
      // console.log(this.sizeForm)
    }
    //点击取消时跳转回首页
    var show = ref(true);
    function backHome() {
      show.value = true;
      // console.log(show.value);
    }
    //点击保存更新并返回展示
    function onSubmit() {
      const editedRow = {
        name: sizeForm.cname,
        age: sizeForm.cage,
        eBG: sizeForm.ceBG,
        school: sizeForm.cschool,
        wAge: sizeForm.cwAge,
      };

      // 使用cname作为唯一标识符在tableData数组中查找已编辑行的索引。
      const rowIndex = tableData.value.findIndex(
        (row) => row.name === editedRow.name
      );

      // 用edit表单中的值更新该索引处的数据。
      if (rowIndex !== -1) {
        Object.assign(tableData.value[rowIndex], editedRow);

        // 更新表数据后，将输入字段重置为空字符串。
        sizeForm.cname = "";
        sizeForm.cage = "";
        sizeForm.ceBG = "";
        sizeForm.cschool = "";
        sizeForm.cwAge = "";
        // 返回展示页面
        show.value = true;
      }
    }
    return {
      search: search,
      handleEdit,
      filterTableData,
      handleDelete,
      show,
      onSubmit,
      sizeForm,
      backHome,
      tableData,
    };
  },
};
</script>

<style scoped>
.form {
  border: 3px solid #336666;
  border-radius: 10px;
}
</style>
