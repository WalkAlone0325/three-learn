<script setup lang="ts">

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
    <div class="layout-main">
      <div class="layout-left">
        <slot name="left" />
      </div>
      <div class="layout-right">
        <slot name="right" />
      </div>
      <div class="layout-center">
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
  }
}
</style>
