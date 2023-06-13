<template>
  <el-table
    v-if="show"
    :data="filterTableData"
    style="width: 100%"
    height="300px"
  >
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="age" label="年龄" width="120" />
    <el-table-column prop="eBG" label="学历" width="120" />
    <el-table-column prop="school" label="毕业院校" width="200" />
    <el-table-column prop="wAge" label="工作年限" width="120" />

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="关键字搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
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
      <el-button type="primary" @click="onSubmit()">保存</el-button>
      <el-button @click="backHome">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, ref, reactive } from "vue";
var search = ref("");

const sizeForm = reactive({
  cname: "",
  cage: "",
  ceBG: "",
  cschool: "",
  cwAge: "",
});

var tableData = ref([
  {
    name: "小红",
    age: "22",
    eBG: "本科",
    school: "广东技术师范大学",
    wAge: "1",
  },
  {
    name: "小蓝",
    age: "23",
    eBG: "本科",
    school: "香港中文大学",
    wAge: "1",
  },
  {
    name: "小绿",
    age: "33",
    eBG: "研究生",
    school: "深圳大学",
    wAge: "4",
  },
  {
    name: "小粉",
    age: "32",
    eBG: "研究生",
    school: "厦门大学",
    wAge: "5",
  },
  {
    name: "紫薇",
    age: "25",
    eBG: "大专",
    school: "深圳信息职业技术学院",
    wAge: "1",
  },
]);

var filterTableData = computed(function () {
  return tableData.value.filter(function (data) {
    return (
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.age.toLowerCase().includes(search.value.toLowerCase()) ||
      data.eBG.toLowerCase().includes(search.value.toLowerCase()) ||
      data.school.toLowerCase().includes(search.value.toLowerCase()) ||
      data.wAge.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
function handleEdit(row) {
  this.show = false;
  // const sizeForm = this.sizeForm
  this.sizeForm.cname = row.name;
  this.sizeForm.cage = row.age;
  this.sizeForm.ceBG = row.eBG;
  this.sizeForm.cschool = row.school;
  this.sizeForm.cwAge = row.wAge;
  // console.log(this.sizeForm)
}
function handleDelete(index) {
  tableData.value.splice(index, 1);
}
export default {
  name: "Table",
  setup() {
    //点击取消时跳转回首页
    var show = ref(true);
    function backHome() {
      show.value = true;
      // console.log(show.value);
    }
    //点击保存更新并返回首页
    function onSubmit() {
      const editedRow = {
        name: sizeForm.cname,
        age: sizeForm.cage,
        eBG: sizeForm.ceBG,
        school: sizeForm.cschool,
        wAge: sizeForm.cwAge
      };

      // 使用cname作为唯一标识符在tableData数组中查找已编辑行的索引。
      const rowIndex = tableData.value.findIndex(row => row.name === editedRow.name);

      // 用edit表单中的值更新该索引处的数据。
      if (rowIndex !== -1) {
        Object.assign(tableData.value[rowIndex], editedRow);

        // 更新表数据后，将输入字段重置为空字符串。
        sizeForm.cname = '';
        sizeForm.cage = '';
        sizeForm.ceBG = '';
        sizeForm.cschool = '';
        sizeForm.cwAge = '';

        show.value = true;
      }
    }
    return {
      search: search,
      filterTableData: filterTableData,
      handleEdit: handleEdit,
      handleDelete: handleDelete,
      show,
      onSubmit,
      sizeForm,
      backHome,
    };
  },
};
</script>

<style scoped>
.common-layout {
  background-color: blue;
}

.el-radio-group {
  margin-right: 12px;
}
</style>
