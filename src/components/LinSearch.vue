<template>
  <div class="lin-search">
    <div class="input-box flex-y-center">
      <div class="input-content flex-y-center">
        <input
            ref="input"
            placeholder="猎豹：我的叫声有那么好笑？"
            spellcheck ="false"
            autocomplete="false"
            @input="inputListen"
            @keydown.enter="enterSearch"
        />
        <svg-icon
            name="clean"
            :class="[searchValue ? 'visible' : 'invisible']"
            @click="clear"
        ></svg-icon>
      </div>
      <div class="input-search flex-y-center">
        <svg-icon name="search"></svg-icon>
      </div>
    </div>
    <div class="more">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const input = ref()
const searchValue = ref('')

const inputListen = () => {
  searchValue.value = input.value.value
}

const enterSearch = () => {
  console.log('点击了回车')
}

const clear = () => {
  input.value.value = ''
  searchValue.value = ''
}

</script>

<style lang="scss" scoped>
.lin-search {
  @apply relative w-300px mr-4;

  .input-box {
    @apply w-full h-40px py-4px px-10px content-box bg-gray-100 bg-opacity-70 rounded-xl border-2 border-solid;

    &:hover {
      @apply bg-white;
    }

    .input-content {
      @apply h-full flex-1 pl-4 pr-4 text-sm rounded-md;

      &:hover {
        @apply bg-gray-100;
      }
      input {
        @apply w-full border-none outline-none bg-transparent;
      }

      .clean-svg {
        fill: #C9CCD0;
        @apply ml-2 cursor-pointer;

        &:hover {
          fill: #61666D;
        }
      }
    }

    .input-search {
      @apply w-32px h-32px justify-center  rounded-md cursor-pointer;

      &:hover {
        @apply bg-gray-100;
      }
    }
  }
}
</style>
