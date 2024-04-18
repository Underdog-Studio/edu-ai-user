<template>
    <NCard title="用户14天提问趋势">
        <div class="h-200" ref="chartRef"></div>
    </NCard>
</template>

<script setup lang="ts">
import echarts from '@/echarts'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption, DatasetComponentOption } from 'echarts/components'
import * as statisApi from '@/apis/statis'

type Option = ComposeOption<
    BarSeriesOption |
    GridComponentOption |
    DatasetComponentOption
>

const chartRef = ref<HTMLDivElement>();
const chart = shallowRef<echarts.ECharts>();
useChartResize(chart);

onMounted(() => {
    chart.value = echarts.init(chartRef.value);
    chart.value.setOption<Option>({
        grid: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 0,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                }
            },
        ],
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#0EECE4'
                        },
                        {
                            offset: 1,
                            color: '#058FE7'
                        }
                    ])
                }
            }
        ]
    })
});

const route = useRoute();
const robotId = route.query.robotId as string;

useRequest(
    () => statisApi.getAskTrendDaysData(robotId),
    {
        onSuccess({ data }) {
            chart.value?.setOption({
                dataset: {
                    dimensions: ['time', 'askNum'],
                    source: data.map(item => [item.date, item.questionCount])
                }
            })
        }
    }
)
</script>

<style scoped></style>