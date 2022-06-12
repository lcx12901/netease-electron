<template>
  <div id="lin-header" :class="['header', 'flex-y-center', 'justify-between', isRadius ? 'header-radius' : '']" style="-webkit-app-region: drag">
    <router-link to="/" class="logo flex-y-center cursor-pointer" style="-webkit-app-region: no-drag">
      <img src="logo.png" class="w-8 h-8">
      <span>软风吹纱</span>
    </router-link>
    <div class="flex-y-center">
      <div class="fun flex-y-center">
        <lin-search style="-webkit-app-region: no-drag"></lin-search>
        <svg-icon name="dark" class="w-20px h-20px cursor-pointer" style="-webkit-app-region: no-drag"></svg-icon>
      </div>
      <div class="flex-y-center">
        <div class="bar-btn ml-5 bg-red-600" @click="mini"></div>
        <div class="bar-btn ml-3 bg-yellow-300" @click="big"></div>
        <div class="bar-btn ml-3 bg-green-600" @click="close"></div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
const isRadius = ref(true)

window.electronAPI.ipcOn<boolean>('isMaximized', (msg) => {
  isRadius.value = !msg
})

const mini = (): void => {
  window.electronAPI.ipcSend<string>('navbar', 'mini')
}

const big = (): void => {
  window.electronAPI.ipcSend<string>('navbar', 'big')

}

const close = (): void => {
  // ipcRenderer.send('navbar', 'close');
}
</script>

<style lang="scss" scoped>
.header {
  @apply fixed box-border h-14 w-screen px-6 py-2
  z-30 bg-white bg-opacity-60 backdrop-filter backdrop-blur-xl backdrop-saturate-150 shadow-md;
  backdrop-filter: saturate(180%) blur(20px);

  .logo{

    span {
      @apply text-xl font-bold ml-3;
    }

    &:hover {
      @apply transition-colors duration-700 text-purple-700;
    }
  }
}
.bar-btn {
  @apply w-4 h-4 rounded-full cursor-pointer scale-100
  transition-all transform-gpu duration-200 hover:scale-120;
  -webkit-app-region: no-drag;
}
.header-radius {
  @apply rounded-tl-lg rounded-tr-lg;
}
</style>
