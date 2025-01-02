import { deleteUser, getUsers, loginUser, registerUser, updateUser } from '@/api/user'
import router from '@/router'
import { computed, reactive, ref } from 'vue'
import { useModalStore } from '../stores/modalStore'
import bcrypt from 'bcryptjs'

export const useController = () => {
  interface LocalStorage {
    email: string
    avatar: string
    id: string
  }

  const { handleCloseModal } = useModalStore()

  const getLocalStorage = computed(() => !!localStorage.getItem('result'))

  const handleDelete = async () => {
    try {
      disabled.value = true
      await deleteUser(localStorageObject()?.id ?? '')
      router.push('/login')
    } catch (error) {
      console.log(error)
      disabled.value = false
    }
  }

  const handleHashedPasswordChange = (e: string) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(e, salt)
    form.password = hash
  }
  const handlePasswordChange = (e: string) => {
    form.password = e
  }
  const handleEmailChange = (e: string) => {
    form.email = e
  }

  return {
    disabled,
    open,
    form,
    getLocalStorage,
    handleUpdate,
    localStorageObject,
    handleLogin,
    handleRegister,
    handleEmailChange,
    handleHashedPasswordChange,
    handlePasswordChange,
    handleDelete,
  }
}
