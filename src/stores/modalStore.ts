import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const defaultState = ref(false)

  const handleOpenModal = () => (defaultState.value = true)

  const handleCloseModal = () => (defaultState.value = false)

  return { defaultState, handleOpenModal, handleCloseModal }
})
