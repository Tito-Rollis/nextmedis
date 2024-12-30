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

  const localStorageObject: () => LocalStorage | null = () => {
    const storage = localStorage.getItem('result')
    return storage ? JSON.parse(storage) : null
  }
  const getLocalStorage = computed(() => !!localStorage.getItem('result'))

  const disabled = ref(false)
  const form = reactive({
    email: '',
    password: '',
  })

  const handleRegister = async () => {
    const users = await getUsers()
    const user = users.find((user) => user.email === form.email)

    // Check availability of email
    if (user) {
      disabled.value = false
      alert('Email sudah ada!!!')
    } else {
      disabled.value = true
      await registerUser(form.email, form.password)
      router.push('/login')
    }
  }

  const handleLogin = async () => {
    try {
      disabled.value = true
      const user = await loginUser(form.email, form.password).then((e) => e)

      if (user) {
        router.push('/')
      } else {
        alert('tidak sukses')
        disabled.value = false
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    try {
      disabled.value = true
      await updateUser(localStorageObject()?.id ?? '', form.email, form.password)

      handleCloseModal()
    } catch (error) {
      console.log(error)
      disabled.value = false
    }
  }

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
