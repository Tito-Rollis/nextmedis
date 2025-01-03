<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import { useApiStore } from '@/stores/apiStore'
import { useFormStore } from '@/stores/formStore'
import { ref } from 'vue'

const formStore = useFormStore()
const apiStore = useApiStore()

const disabled = ref(false)

const handleLogin = () => {
  disabled.value = true
  apiStore.handleLogin()
}
</script>

<template>
  <div class="flex flex-col w-1/2 md:w-1/5 m-auto h-full justify-center gap-2">
    <h1 class="text-white font-medium text-2xl text-center">Login</h1>
    <FormComponent
      btnTitle="Login"
      :disabled="disabled"
      :handleClick="handleLogin"
      :handleEmailChange="formStore.handleEmailChange"
      :handle-password-change="formStore.handlePasswordChange"
    />
    <h1 class="text-white">
      Jika belum daftar, silahkan ke halaman
      <span class="text-indigo-500 font-bold"
        ><RouterLink to="/register">Register</RouterLink></span
      >
    </h1>
  </div>
</template>
