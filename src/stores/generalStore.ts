import router from '@/router'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', () => {
  const handleLogout = () => {
    router.push('/login')
    localStorage.removeItem('result')
  }

  return { handleLogout }
})
