<template>
    <div class="h-200" ref="chartRef"></div>
</template>

<script setup lang="ts">
import echarts from '@/echarts'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { DatasetComponentOption, TimelineComponentOption, PolarComponentOption, TitleComponentOption } from 'echarts/components'

type Option = ComposeOption<
    BarSeriesOption |
    DatasetComponentOption |
    TimelineComponentOption |
    PolarComponentOption |
    TitleComponentOption
>

interface Props {
    usage?: number;
    total?: number;
}

const props = defineProps<Props>();

const chartRef = ref<HTMLDivElement>();
const chart = shallowRef<echarts.ECharts>();
useChartResize(chart);

onMounted(() => {
    chart.value = echarts.init(chartRef.value);
    chart.value.setOption<Option>({
        title: [
            {
                id: 'usage',
                text: '0',
                left: 'center',
                top: '38%',
                textStyle: {
                    fontSize: "30",
                },
            },
            {
                text: '今日使用',
                left: 'center',
                top: '25%',
                textStyle: {
                    fontSize: "16",
                    color: "#A8D6FF",
                },
            },
            {
                id: 'total',
                text: '0',
                left: 'center',
                top: '60%',
                textStyle: {
                    fontSize: "16",
                },
            },
            {
                text: '每日可用',
                left: 'center',
                top: '70%',
                textStyle: {
                    fontSize: "16",
                    color: "#A8D6FF",
                },
            },
        ],
        polar: {
            center: ['50%', '50%'],
            radius: ['100%', '80%']
        },
        angleAxis: {
            max: 0,
            show: false,
        },
        radiusAxis: {
            type: 'category',
            show: false
        },
        series: {
            type: 'bar',
            roundCap: true,
            barWidth: 20,
            showBackground: true,
            coordinateSystem: "polar",
        },
    })
})

watchEffect(() => {
    chart.value?.setOption<Option>({
        title: [
            {
                id: 'usage',
                text: String(props.usage),
            },
            {
                id: 'total',
                text: String(props.total),
            }
        ],
        angleAxis: {
            max: props.total
        },
        dataset: {
            source: [
                ['usage', props.usage]
            ],
        }
    })
})


</script>

<style scoped></style>