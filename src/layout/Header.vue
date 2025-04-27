<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import { config } from '@/constants'
import dayjs from 'dayjs'

const info = reactive({
  time: '--:--:--',
  date: '--/--/--',
  week: '--',
})

const updateInfo = () => {
  const now = dayjs()
  info.time = now.format('HH:mm:ss')
  info.date = now.format('YYYY/MM/DD')
  info.week = now.format('dddd')
}

let interval: number | null = null
onMounted(() => {
  updateInfo()
  interval = setInterval(updateInfo, 1000)
})
onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
})
</script>

<template>
  <div class="layout-header">
    <div class="header-midden">
      <div class="cn">{{config.titleCn}}</div>
      <div class="en">{{config.titleEn}}</div>
    </div>
    <div class="header-left">
      <i class="fa-regular fa-envelope" />
      <div class="message" content="【系统通知】"></div>
    </div>
    <div class="header-right">
      <span>{{info.time}}</span>
      <span>{{info.date}}</span>
      <span>{{info.week}}</span>
      <span>13℃</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin font-color() {
  background: linear-gradient(0deg, #b9cfff 0%, #fff 99%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
@keyframes text-roll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes light-go {
  from {
    left: 500px;
  }
  to {
    left: 1100px;
    opacity: 0;
  }
}
.layout-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-image: url(@/assets/images/title_bg.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%;
  &::after {
    position: absolute;
    bottom: -55px;
    left: 500px;
    width: 500px;
    height: 100px;
    content: '';
    background-image: url(@/assets/images/light_bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    animation: light-go 3s ease-in-out infinite forwards;
  }
  .header-midden {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow-x: hidden;
    font-family: DouyuFont;
    color: #fff;
    .cn {
      font-size: 30px;
      @include font-color;
    }
    .en {
      position: relative;
      font-size: 10px;
      @include font-color;
    }
  }
  .header-left {
    position: absolute;
    top: 20px;
    left: 30px;
    display: flex;
    grid-gap: 6px;
    align-items: center;
    font-size: 18px;
    color: #fff;
    .message {
      display: flex;
      width: 400px;
      overflow: hidden;
      font-size: 16px;
      &::after {
        width: auto;
        text-wrap: nowrap;
        content: attr(content);
        animation: text-roll 20s linear infinite;
        @include font-color;
      }
    }
  }
  .header-right {
    position: absolute;
    top: 20px;
    right: 30px;
    display: flex;
    grid-gap: 20px;
    font-size: 16px;
    color: #fff;
    span {
      position: relative;
      display: flex;
      align-items: center;
      text-shadow: 0 3px 2px #84a8f663;
      @include font-color;
      &:not(:last-child)::after {
        position: absolute;
        right: -10px;
        width: 2px;
        height: 10px;
        content: '';
        background-color: #fff;
        opacity: 0.2;
      }
    }
  }
}
</style>
