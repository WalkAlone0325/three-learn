<template>
  <Panel>
    <div class="wrap">
      <div class="item-list" ref="container">
        <div
          class="item"
          v-for="{ name, status, time } in list"
          :key="name"
          :class="{ error: status === 0 }"
        >
          <div class="item-circle"></div>
          <div class="item-name">{{ name }}</div>
          <div class="item-type">{{ status ? '正常' : '部件异常' }}</div>
          <div class="item-time">{{ time }}</div>
        </div>
      </div>
    </div>
  </Panel>
</template>
<script setup lang="ts">
import Panel from "@/layout/Panel.vue";
import dayjs from "dayjs";

const equipments = [
  '发动机',
  '叶片',
  '轮毂',
  '主轴',
  '发电机',
  '塔架',
  '变流器',
  '变桨系统',
  '齿轮箱',
]

const list = ref<any[]>(
  equipments.map((eq) => ({
    name: eq,
    status: 1,
    time: dayjs().format('MM/dd HH:mm:ss'),
  }))
)

const container = ref()

let timer: any
onMounted(() => {
  if (timer) window.clearInterval(timer)
  timer = setInterval(() => {
    container.value.classList.add('scroll')
    setTimeout(() => {
      if (!timer) return void 0
      container.value.classList.remove('scroll')
      list.value.push(list.value.shift())
    }, 2000)
  }, 3000)
})
</script>

<style lang="scss" scoped>
@keyframes row-out {
  from {
    top: 0;
  }
  to {
    top: -36px;
  }
}
.wrap {
  height: 100%;
  overflow: hidden;
}
.item-list {
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  height: 670px;

  // overflow: hidden;
  &.scroll {
    position: relative;
    animation: row-out 1s linear forwards;
    .row:first-child {
      opacity: 0;
      transition: opacity 1s;
    }
  }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 16px;
    background: linear-gradient(90deg, #74fabd22, transparent);
    &.error {
      background: linear-gradient(90deg, #e38d7022, transparent);
      .item-circle {
        background-color: #e38d70;
      }
    }
    .item-circle {
      position: absolute;
      left: 10px;
      width: 5px;
      height: 10px;
      background-color: #74fabd;
    }
    .item-name {
      width: 30%;
      padding-left: 15px;
    }
    .item-type {
      width: 30%;
    }
    .item-time {
      width: 60%;
      text-align: end;
    }
  }
}
</style>
