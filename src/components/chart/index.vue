<template>
    <!-- 学历饼状图 -->
    <div ref="chart" class="cookie"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted,defineProps } from "vue";

const { Edu } = defineProps({
    Edu: {
        type:Array
    }
})

const chart = ref();//创建dom引用
// 指定图表的配置项和数据
const option = reactive({
    grid: {
        containLabel: true
    },
    title: {
        text: '学历分布',
        left: 'center',
        bottom: "85%"
    },
    legend: {
        top: '15%',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            type: 'pie',
            radius: '50%',
            data: Edu,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
});


// 挂载
onMounted(() => {
    setTimeout(() => {
        initChart();
    }, 400)
})
const initChart = () => {
    // 基于准备好的dom初始化echarts实例
    var myChart = echarts.init(chart.value)
    // 使用指定的配置项和数据显示图表
    myChart.setOption(option);
    window.addEventListener('resize', () => {
        myChart.resize()
    })
}
</script>



<style scoped></style>
