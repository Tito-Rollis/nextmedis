<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import { useController } from '@/composable/useController'

const { handleRegister, handleEmailChange, handleHashedPasswordChange, disabled } = useController()
</script>

<template>
  <div class="flex flex-col w-1/2 md:w-1/5 m-auto h-full justify-center gap-2">
    <h1 class="text-white font-medium text-2xl text-center">Register</h1>
    <FormComponent
      btnTitle="Register"
      :disabled="disabled"
      :handleClick="handleRegister"
      :handleEmailChange="handleEmailChange"
      :handle-password-change="handleHashedPasswordChange"
    />
    <h1 class="text-white">
      Jika sudah terdaftar, silahkan ke halaman
      <span class="text-indigo-500 font-bold"><RouterLink to="/login">Login</RouterLink></span>
    </h1>
  </div>
</template>
