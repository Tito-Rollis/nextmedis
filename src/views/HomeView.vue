<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import ModalFormComponent from '@/components/ModalFormComponent.vue'
import router from '@/router'
import { computed, onMounted, ref } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { useApiStore } from '@/stores/apiStore'
import { useGeneralStore } from '@/stores/generalStore'
import { useFormStore } from '@/stores/formStore'

const modalStore = useModalStore()
const formStore = useFormStore()
const apiStore = useApiStore()
const generalStore = useGeneralStore()

const disabled = ref(false)
const handleUpdate = () => {
  disabled.value = true
  apiStore.handleUpdate()
}

onMounted(() => {
  if (!apiStore.getLocalStorage) {
    router.push('/login')
  }
})

const localStorage = computed(() => apiStore.localStorageObject())
</script>

<template>
  <div id="user-profile" class="w-screen h-screen flex flex-col p-4">
    <div class="flex w-full justify-end">
      <div class="flex items-center gap-4">
        <!-- Icon -->
        <span
          @click="modalStore.handleOpenModal"
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
          :handleClick="generalStore.handleLogout"
        />
      </div>
    </div>
    <!-- User Profil -->
    <div class="flex flex-col w-full h-full justify-center items-center gap-2">
      <div class="w-14 h-14 rounded-full" :style="`background:${localStorage?.avatar}`"></div>
      <h1 class="text-white">{{ localStorage?.email }}</h1>
      <img
        @click="apiStore.handleDelete"
        class="cursor-pointer"
        src="../assets/delete.svg"
        alt=""
      />
    </div>
  </div>

  <ModalFormComponent
    v-if="modalStore.defaultState"
    :email-placeholder="localStorage?.email ?? ''"
    :disabled="disabled"
    :handle-update="handleUpdate"
    :handle-email-change="formStore.handleEmailChange"
    :handle-password-change="formStore.handleHashedPasswordChange"
  />
</template>
