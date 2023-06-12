<template>
  <el-table :data="filterTableData" style="width: 100%">
<<<<<<< HEAD
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="300" />
    <el-table-column prop="zip" label="Zip" width="120" />
=======
     <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="300" />
        <el-table-column prop="zip" label="Zip" width="120" />
>>>>>>> 602127401780315092f4bc902fa4c8c97da40ce2

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
<<<<<<< HEAD
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
=======
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
>>>>>>> 602127401780315092f4bc902fa4c8c97da40ce2
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { computed, ref } from "vue";
var search = ref("");
var tableData = ref([
<<<<<<< HEAD
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
=======
   {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
>>>>>>> 602127401780315092f4bc902fa4c8c97da40ce2
]);
var filterTableData = computed(function () {
  return tableData.value.filter(function (data) {
    return (
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
function handleEdit(index, row) {
  console.log(index, row);
}
function handleDelete(index, row) {
  console.log(index, row);
}
export default {
<<<<<<< HEAD
  name: 'Table',
  setup() {
    return {
      search: search,
      filterTableData: filterTableData,
      handleEdit: handleEdit,
      handleDelete: handleDelete,
    }
  },
=======
    name: 'Table',
    setup() {
        return {
            search: search,
            filterTableData: filterTableData,
            handleEdit: handleEdit,
            handleDelete: handleDelete,
        }
    },
>>>>>>> 602127401780315092f4bc902fa4c8c97da40ce2
}

</script>

<style scoped>
.common-layout {
  background-color: blue;
}
</style>
