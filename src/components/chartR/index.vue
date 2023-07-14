<template>
    <!-- 工作年限饼状图 -->
    <div ref="chart" class="cookie"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";

const { WorkTime } = defineProps({
    WorkTime: {
        type: Array
    }
})
const chart = ref();//创建dom引用
// 指定图表的配置项和数据
const option = reactive({
    title: {
        text: '工作年限',
        left: 'center',
        bottom: "85%"
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '15%',
        left: 'center'
    },
    series: [
        {
            type: 'pie',
            radius: ['50%', '30%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 1
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: WorkTime
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
