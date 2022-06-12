<template>
  <div :class="['app-container', isRadius ? 'app-radius' : '']">
    <lin-header></lin-header>
    <img src="logo.png"/>

  </div>
</template>

<script setup lang="ts">
const isRadius = ref(true)
console.log(window.electronAPI.getStore('name'))
window.electronAPI.ipcOn<boolean>('isMaximized', (msg) => {
  isRadius.value = !msg
})

</script>

<style lang="scss" scoped>
  .app-container {
    @apply w-screen h-screen bg-gray-50;
  }

  .app-radius {
    @apply rounded-lg overflow-hidden;
  }

</style>
