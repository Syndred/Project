<template>
    <el-row justify="center" style="margin: 5vh 0" :gutter="0">
        <!-- 描述简介 -->
        <el-col :span="6">
            <h2>欢迎使用蓝云简历系统</h2>
            <p>蓝云简历拥有简历识别功能，通过大数据训练模型，精准识别简历内容，提取关键字段；蓝云简历拥有人岗匹配功能，帮助hr一键匹配所需简历；蓝云简历还提供数据可视化，直观查看简历和岗位信息，还可通过年龄段的图表展示轻松裁员（狗头）
            </p>
            <el-button size="large" type="primary" color="#5369d7">体验人岗匹配</el-button>
            <el-button color="#626aef" size="large" plain>体验简历识别</el-button>

        </el-col>
        <!-- 贴图 -->
        <el-col :span="4" :offset="1">
            <div class="img"><img src="@/assets/pic.jpeg" alt="" /></div>
        </el-col>
        <el-col :span="16"><el-divider /></el-col>
    </el-row>

    <!-- 统计 -->
    <el-row justify="center" style="margin: 5vh 0">
        <el-col :span="10" style="text-align: center">
            <el-row>
                <el-col :span="6">
                    <el-statistic :value="6666">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                简历总数
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Avatar />
                                </el-icon>
                            </div>
                        </template>
                    </el-statistic>
                </el-col>
                <el-col :span="6">
                    <el-statistic :value="6666">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                岗位总数
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Suitcase />
                                </el-icon>
                            </div>
                        </template>
                    </el-statistic>
                </el-col>
                <el-col :span="6">
                    <el-statistic :value="52">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                男女比例
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Male />
                                </el-icon>
                            </div>
                        </template>
                        <template #suffix>/100</template>
                    </el-statistic>
                </el-col>

                <el-col :span="6">
                    <el-statistic title="回复总数" :value="562">
                        <template #suffix>
                            <el-icon style="vertical-align: -0.125em">
                                <ChatLineRound />
                            </el-icon>
                        </template>
                    </el-statistic>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <!-- 柱状图和饼状图 -->
    <el-row justify="center">
        <!-- 年龄分布柱状图 -->
        <!-- <el-row justify="center"></el-row> -->
        <el-col :span="12" style="text-align: center">
            <div ref="chart" class="cookie"></div>
        </el-col>
        <!-- 学历和工作年限饼状图 -->
        <el-col :span="16">
            <el-row justify="center">
                <el-col :span="10">
                    <Chart></Chart>
                </el-col>
                <el-col :span="10">
                    <Chart></Chart>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
</template>

<script setup>
import Chart from "@/components/chart";
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";

const chart = ref(); //创建dom引用
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
            data: ["20-25", "26-30", "30-35", "36-40", "40以上",],
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
            name: "Direct",
            type: "bar",
            barWidth: "40%",
            data: [25, 29, 23, 15, 10,],
        },
    ],
});

// 挂载
onMounted(() => {
    initChart();
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

<style scoped>
/* 介绍字体标题 */
.headmsg {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #32325d;
    font-size: 40px;
}

/* 介绍字体正文 */
.font {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #32325d;
}

.cookie {
    text-align: center;
    height: 33rem;
}

/* 图片样式 */
.img img {
    /* width: 10rem; */
    height: 11rem;
    object-fit: contain;
    border-radius: 1rem;
}

/* row对齐方式 */
.el-row {
    align-items: center;
}
</style>
