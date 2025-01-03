import { defineStore } from 'pinia'
import { reactive } from 'vue'
import bcrypt from 'bcryptjs'

export const useFormStore = defineStore('form', () => {
  const form = reactive({
    email: '',
    password: '',
  })

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

  return { form, handleEmailChange, handlePasswordChange, handleHashedPasswordChange }
})
