import { deleteUser, getUsers, loginUser, registerUser, updateUser } from '@/api/user'
import { defineStore } from 'pinia'
import { useGeneralStore } from './generalStore'
import router from '@/router'
import { useModalStore } from './modalStore'
import { useFormStore } from './formStore'
import { computed } from 'vue'

interface LocalStorage {
  email: string
  avatar: string
  id: string
}

export const useApiStore = defineStore('api', () => {
  const localStorageObject: () => LocalStorage | null = () => {
    const storage = localStorage.getItem('result')
    return storage ? JSON.parse(storage) : null
  }
  const getLocalStorage = computed(() => !!localStorage.getItem('result'))

  const generalStore = useGeneralStore()
  const modalStore = useModalStore()
  const formStore = useFormStore()

  const handleRegister = async () => {
    const users = await getUsers()
    const user = users.find((user) => user.email === formStore.form.email)

    // Check availability of email
    if (user) {
      generalStore.$patch({ disabled: false })
      alert('Email sudah ada!!!')
    } else {
      generalStore.$patch({ disabled: true })
      await registerUser(formStore.form.email, formStore.form.password)
      router.push('/login')
    }
  }

  const handleLogin = async () => {
    try {
      generalStore.$patch({ disabled: true })
      const user = await loginUser(formStore.form.email, formStore.form.password).then((e) => e)

      if (user) {
        router.push('/')
      } else {
        alert('tidak sukses')
        generalStore.$patch({ disabled: false })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateUser(
        localStorageObject()?.id ?? '',
        formStore.form.email,
        formStore.form.password,
      )

      modalStore.handleCloseModal()
    } catch (error) {
      console.log(error)
      generalStore.$patch({ disabled: false })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteUser(localStorageObject()?.id ?? '')
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleUpdate,
    handleDelete,
    localStorageObject,
    getLocalStorage,
  }
})
