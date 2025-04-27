<script setup lang="ts">

import Header from "@/layout/Header.vue";

interface PropsType {
  load: {
    total: number
    loaded: number
    isLading: boolean
  }
}
defineProps<PropsType>()
</script>

<template>
  <div class="layout">
    <Header />
    <div class="layout-main">
      <div class="main-left">
        <slot name="left" />
      </div>
      <div class="main-right">
        <slot name="right" />
      </div>
      <div class="main-center">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  background: #000;

  .layout-main {
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
    background-color: #05326a;
    background-image: url('@/assets/images/bg_01.png');
    background-repeat: repeat;

    .main-left {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 999;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: repeat(3, calc((100% - 40px) / 3));
      grid-gap: 20px;
      width: 420px;
      height: calc(100% - 20px);
    }

    .main-right {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 999;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: repeat(3, calc((100% - 40px) / 3));
      grid-gap: 20px;
      width: 420px;
      height: calc(100% - 20px);
    }

    .main-center {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: radial-gradient(circle, transparent 30%, #000 70%);
      }
    }
  }
}
</style>
