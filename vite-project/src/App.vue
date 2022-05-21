<script setup>
import { reactive } from 'vue'

const state = reactive({
    defaultOpen: ['1', '2', '3', '4'],
    showMenu: true,
    currentPath: '/dashboard',
    count: {
        number: 1
    }
})
</script>

<template>
  <div class="layout">
      <el-container v-if="state.showMenu" class="container">新站点分手快乐</el-container>
      <el-container v-else class="container"></el-container>
  </div>
</template>

<style>

</style>
