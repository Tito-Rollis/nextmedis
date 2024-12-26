<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  handleChange: (e: string) => void
  type: string
  label: string
  placeholder?: string
}>()

const text = ref('')
const handleChange = () => {
  props.handleChange(text.value)
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <h1 class="text-white">{{ props.label }}</h1>
    <input
      :placeholder="props.placeholder"
      class="p-2 rounded"
      :type="props.type"
      @change="handleChange"
      v-model="text"
      required
    />
  </div>
</template>
