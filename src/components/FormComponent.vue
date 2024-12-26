<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue'
import InputComponent from './InputComponent.vue'

const props = defineProps<{
  handleClick: () => void
  handleEmailChange: (e: string) => void
  handlePasswordChange: (e: string) => void
  disabled: boolean
  btnTitle: string
  placeholder?: string
}>()
</script>

<template>
  <form class="gap-4 flex flex-col w-full" @submit.prevent="handleClick">
    <InputComponent
      :placeholder="props.placeholder"
      label="Email"
      type="email"
      :handleChange="props.handleEmailChange"
    />
    <InputComponent label="Password" type="password" :handleChange="props.handlePasswordChange" />
    <ButtonComponent
      type="submit"
      bgColor="bg-indigo-500"
      :title="props.btnTitle"
      :disabled="props.disabled"
      textColor="text-white"
    />
  </form>
</template>
