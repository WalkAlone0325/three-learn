<script setup lang="ts">
import Layout from "@/layout/Layout.vue";
import { Widget01, Widget02, Widget03, Widget04, Widget05, Widget06, Widget07 } from "@/components";
// import { useTurbine } from '@/hooks'
//
// const {
//   container,
//   loading,
//   current,
//   eqDecomposeAnimation,
//   eqComposeAnimation,
//   startWarning,
//   stopWarning,
// } = useTurbine()

const load = ref({})
const current = ref(false)
</script>

<template>
  <Layout :load="load">
    <template #left>
      <Widget04 title="参数监测" />
      <Widget02 title="历史功率" />
      <Widget03 title="日发电量监测" />
    </template>
    <template #right>
      <Widget07 v-show="current" :name="current" :title="current + '详情'" />
      <Widget06 v-show="!current" title="运行监测" />
      <Widget01 title="故障对比" />
      <Widget05 title="偏航角度监测" />
    </template>
    <template>
      <div style="width: 100%;height: 100%" ref="container"></div>
    </template>
  </Layout>
</template>
