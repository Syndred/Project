<template>
        <!-- 右侧学历和工作年限饼状图 -->
            <div ref="chart" class="cookie">
            </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";

const chart = ref();//创建dom引用
// 指定图表的配置项和数据
const option = reactive({
    grid: {
        containLabel: true
    },
    title: {
        text: 'Referer of a Website',
        left: 'center',
        bottom: "85%"
    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
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
    initChart();
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



<style scoped>

</style>
