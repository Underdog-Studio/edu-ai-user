import * as echarts from 'echarts/core'
// 图表
import {
    BarChart,
    LineChart,
    PieChart
} from 'echarts/charts'
// 组件
import {
    GridComponent,
    TooltipComponent,
    DatasetComponent,
    LegendComponent,
    TitleComponent,
    PolarComponent
} from 'echarts/components'
// 渲染器
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    BarChart,
    LineChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    PolarComponent,
    DatasetComponent,
    CanvasRenderer
]);

export default echarts;