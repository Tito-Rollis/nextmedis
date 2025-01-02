import { getUsers, loginUser, registerUser, updateUser } from '@/api/user'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useGeneralStore } from './generalStore'
import router from '@/router'
import { useModalStore } from './modalStore'

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

  const generalStore = useGeneralStore()
  const modalStore = useModalStore()

  const form = reactive({
    email: '',
    password: '',
  })

  const handleRegister = async () => {
    const users = await getUsers()
    const user = users.find((user) => user.email === form.email)

    // Check availability of email
    if (user) {
      generalStore.$patch({ disabled: false })
      alert('Email sudah ada!!!')
    } else {
      generalStore.$patch({ disabled: true })
      await registerUser(form.email, form.password)
      router.push('/login')
    }
  }

  const handleLogin = async () => {
    try {
      generalStore.$patch({ disabled: true })
      const user = await loginUser(form.email, form.password).then((e) => e)

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
      generalStore.$patch({ disabled: true })
      await updateUser(localStorageObject()?.id ?? '', form.email, form.password)

      modalStore.handleCloseModal()
    } catch (error) {
      console.log(error)
      generalStore.$patch({ disabled: false })
    }
  }

  return { form, handleRegister, handleLogin, handleUpdate }
})
