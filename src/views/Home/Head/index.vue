<template>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="1">简历库</el-menu-item>
        <el-menu-item index="3">简历录入</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
        <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const activeIndex = ref("1");
        const activeIndex2 = ref("1");
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath);
        };
        return { activeIndex, activeIndex2, handleSelect };
    },
};
</script>

<style scoped>
.common-layout {
    background-color: green;
}
</style>
