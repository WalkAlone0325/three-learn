<script setup lang="ts">
import Layout from "@/layout/Layout.vue";
</script>

<template>
  <Layout :load="load">
    <template #left>
      1
    </template>
    <template #right>
      2
    </template>
    <template>
      3
    </template>
  </Layout>
</template>
