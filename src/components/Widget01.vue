<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import Panel from '@/layout/Panel.vue'
import { useEcharts } from '@/hooks'
import type { EChartsOption } from 'echarts'

const { container, echarts, setOption } = useEcharts()

const options: EChartsOption = {
  legend: {
    show: true,
    right: 0,
    textStyle: {
      color: '#fff',
    },
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#000',
    borderColor: '#333',
    textStyle: {
      color: '#fff',
    },
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '0%',
    top: '20%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
      margin: 10,
    },
    data: ['08月', '09月', '10月', '11月', '12月'],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#fff',
    },
    splitLine: {
      lineStyle: {
        color: '#c8c8c830',
        type: 'dashed',
      },
    },
  },
  series: [
    {
      name: '2024年',
      type: 'bar',
      emphasis: { focus: 'series' },
      data: [320, 332, 301, 334, 390],
      barWidth: 20,
      barGap: '20%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 254, 169, 1)' },
          { offset: 1, color: 'rgba(0, 254, 169, 0.1)' },
        ]),
      },
    },
    {
      name: '2023年',
      type: 'bar',
      emphasis: { focus: 'series' },
      data: [220, 182, 191, 234, 290],
      barWidth: 20,
      barGap: '20%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(87, 153, 214, 1)' },
          { offset: 1, color: 'rgba(87, 153, 214, 0.1)' },
        ]),
      },
    },
  ],
}

onMounted(async () => {
  await nextTick()
  setOption(options)
})
</script>

<template>
  <Panel>
    <div class="container" ref="container"></div>
  </Panel>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
