<template>
    <!-- 年龄分布柱状图 -->
    <div ref="chart" class="cookie"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";
const { AGE } = defineProps({
    AGE: {
        type: Array,
    },
});

//创建dom引用
const chart = ref();
// 指定图表的配置项和数据
const option = reactive({
    title: {
        text: "年龄分布",
        left: "center",
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            data: ["20-25岁", "26-30岁", "31-35岁", "36-40岁", "40岁以上"],
            axisTick: {
                alignWithLabel: true,
            },
        },
    ],
    yAxis: [
        {
            type: "value",
        },
    ],
    series: [
        {
            name: "人数",
            type: "bar",
            barWidth: "40%",
            data: AGE,
        },
    ],
});
// 挂载
onMounted(() => {
    setTimeout(() => {
        initChart();
    }, 400);
});
const initChart = () => {
    // 基于准备好的dom初始化echarts实例
    var myChart = echarts.init(chart.value);
    // 使用指定的配置项和数据显示图表
    myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    });
};
</script>

<style scoped></style>
