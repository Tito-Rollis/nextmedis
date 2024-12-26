import { deleteUser, getUsers, loginUser, registerUser, updateUser } from '@/api/user'
import router from '@/router'
import { computed, reactive, ref } from 'vue'
import bcrypt from 'bcryptjs'

export const useController = () => {
  interface LocalStorage {
    email: string
    avatar: string
    id: string
  }

  const open = ref(false)

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
      alert('Email sudah ada!!!')
      disabled.value = false
    } else {
      await registerUser(form.email, form.password)
      router.push('/login')
      disabled.value = true
    }
  }

  const handleLogin = async () => {
    try {
      const user = await loginUser(form.email, form.password).then((e) => e)

      if (user) {
        router.push('/')
        disabled.value = true
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
      await updateUser(localStorageObject()?.id ?? '', form.email, form.password)

      closeModal()
      disabled.value = true
    } catch (error) {
      console.log(error)
      disabled.value = false
    }
  }

  const handleDelete = async () => {
    try {
      await deleteUser(localStorageObject()?.id ?? '')
      disabled.value = true
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

  const openModal = () => {
    open.value = true
  }
  const closeModal = () => {
    open.value = false
  }
  return {
    disabled,
    open,
    openModal,
    closeModal,
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
