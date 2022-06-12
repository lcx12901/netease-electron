<template>
  <svg aria-hidden="true" :class="['w-4', 'h-4', className]">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#000',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const className = computed(() => `${props.name}-svg`)
    return { symbolId, className }
  },
})
</script>
