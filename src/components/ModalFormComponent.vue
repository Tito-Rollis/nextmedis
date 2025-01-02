<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import FormComponent from './FormComponent.vue'

const props = defineProps<{
  handleUpdate: () => void
  handleEmailChange: (e: string) => void
  handlePasswordChange: (e: string) => void
  disabled: boolean
  emailPlaceholder: string
}>()

const { handleCloseModal } = useModalStore()
</script>

<template>
  <Teleport to="#user-profile">
    <div
      class="absolute left-0 right-0 bottom-0 top-0 z-50 flex m-auto justify-center items-center"
    >
      <div class="flex flex-col bg-white/30 backdrop-blur-sm w-5/6 md:w-1/2 h-fit p-6 rounded">
        <span
          @click="handleCloseModal"
          class="material-symbols-rounded text-white text-3xl cursor-pointer self-end w-fit"
        >
          close
        </span>
        <FormComponent
          btn-title="Update"
          :disabled="props.disabled"
          :handle-email-change="props.handleEmailChange"
          :handle-password-change="props.handlePasswordChange"
          :placeholder="props.emailPlaceholder"
          :handle-click="props.handleUpdate"
        />
      </div>
    </div>
  </Teleport>
</template>
