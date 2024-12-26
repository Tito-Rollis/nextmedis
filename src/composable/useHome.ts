import router from '@/router'
import { ref } from 'vue'

export const useHome = () => {
  const disabled = ref(false)

  const handleLogout = () => {
    router.push('/login')
    localStorage.removeItem('result')
  }

  return {
    disabled,
    handleLogout,
  }
}
