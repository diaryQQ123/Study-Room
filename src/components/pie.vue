<template>
  <div class="circle-chart-container">
    <!-- 使用 v-chart 组件，通过 option 传入配置 -->
    <v-chart :option="chartOption" style="width: 100%; height: 50px;margin-top: 10px;" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// 定义图表配置项
const chartOption = ref({
  // 饼图配置（环形图需设置 radius 为数组，如 ['40%', '70%']）
  series: [
    {
      type: 'pie', // 类型为饼图，改为 'ring' 则为环形图
      radius: '60%', // 半径，环形图可设为 ['内半径', '外半径']
      center: ['50%', '50%'], // 圆心位置
      data: [
        { value: 30, name: '类别A' },
        { value: 25, name: '类别B' },
        { value: 20, name: '类别C' },
        { value: 15, name: '类别D' },
        { value: 10, name: '类别E' }
      ],
      // 配置标签显示
      label: {
        show: true,
        formatter: '{b}: {c} ({d}%)' // 显示名称、数值、百分比
      },
      // 配置交互效果
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

// 接收外部数据（可选）
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

// 监听数据变化并更新图表
watch(
  () => props.data,
  (newData) => {
    if (newData.length > 0) {
      chartOption.value.series[0].data = newData
    }
  },
  { deep: true }
)

// 初始化图表（可选，如需自定义事件）
onMounted(() => {
  // 获取图表实例（用于监听事件）
})
</script>

<style scoped>
.circle-chart-container {
  width: 100%;
  height: 100%;
}
</style>