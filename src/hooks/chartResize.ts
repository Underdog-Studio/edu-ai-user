import echarts from '@/echarts'

export function useChartResize(chart: Ref<echarts.ECharts| undefined>) {
    onMounted(() => {
        window.addEventListener('resize', () => {
            chart.value?.resize();
        })
    })
}