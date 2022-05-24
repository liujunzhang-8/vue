<template>
    <el-card class="introduce">
        <div class="order">
            <el-card class="order-item">
                <template #header>
                    <div class="card-header">
                        <span>今日订单数</span>
                    </div>
                </template>
                <div class="item">2022</div>
            </el-card>
            <el-card class="order-item">
                <template #header>
                    <div class="card-header">
                        <span>今日日活</span>
                    </div>
                </template>
                <div class="item">38780</div>
            </el-card>
            <el-card class="order-item">
                <template #header>
                    <div class="card-header">
                        <span>转化率</span>
                    </div>
                </template>
                <div class="item">18%</div>
            </el-card>
        </div>
        <div id="zoom"></div>
    </el-card>
</template>

<script setup>
// 必须使用下面这种方式引入echarts，否则会报错
import * as echarts from 'echarts'
import { onMounted, onUnmounted } from 'vue'

let myChart = null
onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('zoom'))
    // 指定图标的配置项和数据
    const option = {
        title: {
            text: '系统折线图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '6a7985'
                }
            }
        },
        legend: {
            data: ['新增注册', '付费用户', '活跃用户', '订单数', '当日总收入']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['2022-05-22', '2022-05-23', '2022-05-24', '2022-05-25', '2022-05-26', '2022-05-27', '2022-05-28']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '新增注册',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [420, 332, 101, 134, 550, 230, 210]
            },
            {
                name: '付费用户',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [566, 454, 543, 134, 678, 234, 343]
            },
            {
                name: '活跃用户',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [888, 443, 343, 334, 535, 565, 355]
            },
            {
                name: '订单数',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [345, 132, 322, 690, 157, 789, 210]
            },
            {
                name: '当日总收入',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [1232, 632, 1121, 1340, 908, 2380, 1210]
            }
        ]
    }

    myChart.setOption(option)
})
onUnmounted(() => {
    myChart.dispose()
})
</script>

<style lang="scss" scoped>
.introduce {
    .order {
        display: flex;
        margin-bottom: 50px;
        .order-item {
            flex: 1;
            margin-right: 20px;
        }
        .order-item:last-child {
            margin-right: 0;
        }
    }
    #zoom {
        min-height: 300px;
    }
}
</style>
