<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import ModalFormComponent from '@/components/ModalFormComponent.vue'
import router from '@/router'
import { onMounted } from 'vue'
import { useHome } from '@/composable/useHome'
import { useController } from '@/composable/useController'

const { handleLogout } = useHome()

const {
  open,
  closeModal,
  openModal,
  getLocalStorage,
  localStorageObject,
  handleDelete,
  handleUpdate,
  disabled,
  handleEmailChange,
  handleHashedPasswordChange,
} = useController()
onMounted(() => {
  if (!getLocalStorage.value) {
    router.push('/login')
  }
})
</script>

<template>
  <div id="user-profile" class="w-screen h-screen flex flex-col p-4">
    <div class="flex w-full justify-end">
      <div class="flex items-center gap-4">
        <!-- Icon -->
        <span
          @click="openModal"
          class="material-symbols-rounded text-white text-3xl cursor-pointer"
        >
          settings
        </span>
        <ButtonComponent
          title="Logout"
          bgColor="bg-yellow-500"
          textColor="text-white"
          type="button"
          width="w-fit"
          :handleClick="handleLogout"
        />
      </div>
    </div>
    <!-- User Profil -->
    <div class="flex flex-col w-full h-full justify-center items-center gap-2">
      <div
        class="w-14 h-14 rounded-full"
        :style="`background:${localStorageObject()?.avatar}`"
      ></div>
      <h1 class="text-white">{{ localStorageObject()?.email }}</h1>
      <img @click="handleDelete" class="cursor-pointer" src="../assets/delete.svg" alt="" />
    </div>
  </div>

  <ModalFormComponent
    :email-placeholder="localStorageObject()?.email ?? ''"
    :handle-close-modal="closeModal"
    :open="open"
    :disabled="disabled"
    :handle-update="handleUpdate"
    :handle-email-change="handleEmailChange"
    :handle-password-change="handleHashedPasswordChange"
  />
</template>
