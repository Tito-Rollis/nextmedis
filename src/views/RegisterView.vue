<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import { useApiStore } from '@/stores/apiStore'
import { useFormStore } from '@/stores/formStore'
import { ref } from 'vue'

const formStore = useFormStore()
const apiStore = useApiStore()

const disabled = ref(false)

const handleRegister = () => {
  disabled.value = true
  apiStore.handleRegister()
}
</script>

<template>
  <div class="flex flex-col w-1/2 md:w-1/5 m-auto h-full justify-center gap-2">
    <h1 class="text-white font-medium text-2xl text-center">Register</h1>
    <FormComponent
      btnTitle="Register"
      :disabled="disabled"
      :handleClick="handleRegister"
      :handleEmailChange="formStore.handleEmailChange"
      :handle-password-change="formStore.handleHashedPasswordChange"
    />
    <h1 class="text-white">
      Jika sudah terdaftar, silahkan ke halaman
      <span class="text-indigo-500 font-bold"><RouterLink to="/login">Login</RouterLink></span>
    </h1>
  </div>
</template>
