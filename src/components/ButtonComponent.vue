<script setup lang="ts">
const props = defineProps<{
  title: string
  handleClick?: () => void
  disabled?: boolean
  bgColor: string
  textColor: string
  width?: string
  type: 'button' | 'submit' | 'reset' | undefined
}>()

// const handleSubmit = (e: Event | undefined) => {
//   e?.preventDefault()
//   props.handleClick()
// }
// const computedEvent = computed(() => (props.type === 'submit' ? 'submit' : 'click'))
</script>

<template>
  <button
    @click="props?.handleClick"
    :type="props.type"
    class="py-2 px-6 bg-indigo-500 text-center w-full rounded transition-all"
    :disabled="props.disabled"
    :class="`${props.bgColor} ${props.textColor}
    ${props.width} ${!props.disabled ? 'cursor-pointer opacity-100' : 'opacity-50'}`"
  >
    {{ props.title }}
  </button>
</template>
