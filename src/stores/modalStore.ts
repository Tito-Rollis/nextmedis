import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const defaultState = ref(false)

  const openModal = computed(() => defaultState)
  const handleOpenModal = () => {
    defaultState.value = true
  }

  const handleCloseModal = () => (defaultState.value = false)

  return { openModal, handleOpenModal, handleCloseModal }
})
