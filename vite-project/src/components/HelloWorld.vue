<script setup>
import { ref, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({
    id: 100,
    arr: [1,2,3],
    obj: {id: 200}
})

const change = () => {
    count.value++
}

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <button @click="change()">响应式：{{state.id}}</button>
  <div>{{state.id}}</div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
