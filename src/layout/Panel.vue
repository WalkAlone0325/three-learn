<script setup lang="ts">
defineProps<{ title?: string | number }>()
</script>

<template>
  <div class="layout-panel animate animate__bounceIn">
    <div class="panel-header">
      <div class="panel-header-title">{{ title }}</div>
    </div>
    <div class="panel-body">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-panel {
  position: relative;
  height: 100%;
  color: #fff;
  background-image: url('@/assets/images/panel_body_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .panel-header {
    display: flex;
    align-items: center;
    height: 65px;
    font-family: DouyuFont;
    background-image: url('@/assets/images/panel_title_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .panel-header-title {
      position: relative;
      top: -12px;
      left: 70px;
      font-size: 15px;
    }
  }

  .panel-body {
    box-sizing: border-box;
    height: calc(100% - 65px);
    padding: 0 10px 10px;
    overflow: hidden;
  }
}
</style>
