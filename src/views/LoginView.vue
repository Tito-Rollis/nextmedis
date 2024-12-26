<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import { useController } from '@/composable/useController'

const { handleLogin, handleEmailChange, handlePasswordChange, disabled } = useController()
</script>

<template>
  <div class="flex flex-col w-1/2 md:w-1/5 m-auto h-full justify-center gap-2">
    <h1 class="text-white font-medium text-2xl text-center">Login</h1>
    <FormComponent
      btnTitle="Login"
      :disabled="disabled"
      :handleClick="handleLogin"
      :handleEmailChange="handleEmailChange"
      :handle-password-change="handlePasswordChange"
    />
    <h1 class="text-white">
      Jika belum daftar, silahkan ke halaman
      <span class="text-indigo-500 font-bold"
        ><RouterLink to="/register">Register</RouterLink></span
      >
    </h1>
  </div>
</template>
