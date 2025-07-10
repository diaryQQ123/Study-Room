<template>
  <div class="circle-chart-container">
    <!-- 保持 v-chart 组件，修改 option 配置 -->
    <v-chart :option="chartOption" style="width: 100%; height: 50px;margin-top: 10px;" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// 定义柱状图配置项（关键修改点：type、series、xAxis、yAxis）
const chartOption = ref({
  // 标题（可选）
  // 工具箱（可选，包含缩放等功能）
  // 坐标轴配置
  xAxis: {
    type: 'category', // 分类轴
    data: ['类别A', '类别B', '类别C', '类别D', '类别E'] // x轴数据标签
  },
  yAxis: {
    type: 'value', // 数值轴
    name: '数值' // y轴名称
  },
  // 系列配置（柱状图核心）
  series: [
    {
      type: 'bar', // 类型改为柱状图（bar）
      data: [30, 25, 20, 15, 10], // 柱状图数据（仅数值）
      barWidth: '30%', // 柱体宽度
      label: {
        show: true, // 显示数值标签
        position: 'top' // 标签位置在柱体上方
      }
    }
  ]
})

// 接收外部数据（格式调整：柱状图数据需拆分为 xAxis.data 和 series.data）
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

// 监听数据变化并更新图表（适配柱状图数据格式）
watch(
  () => props.data,
  (newData) => {
    if (newData.length > 0) {
      // 从数据中提取名称和数值
      const categories = newData.map(item => item.name)
      const values = newData.map(item => item.value)
      
      // 更新配置项
      chartOption.value.xAxis.data = categories
      chartOption.value.series[0].data = values
    }
  },
  { deep: true }
)

// 初始化图表（事件监听保持不变）
onMounted(() => {

})
</script>

<style scoped>
.circle-chart-container {
  width: 100%;
  height: 100%;
}
</style>