<template>
  <div class="p-3">
    <Menubar :model="items" class="mb-4">
      <template #start>
        <img src="../assets/logo-colorido.png" alt="logo" class="hidden lg:block dark:hidden h-5 w-20">
        <img src="../assets/logo-dark.png" alt="logo" class="hidden lg:dark:block h-5 w-20">
      </template>
      <template #end>
        <PButton v-if="authStore.isAuthenticated" icon="pi pi-sign-out" label="Sair" class="p-button-danger"
          @click="handleLogout" />
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'

import Menubar from 'primevue/menubar'
import PButton from 'primevue/button'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const items = ref([
  {
    label: 'Orçamentos',
    command: () => router.push('/orcamentos')
  },
  {
    label: 'Novo Orçamento',
    command: () => router.push('/novo-orcamento')
  }
])

const handleLogout = async () => {
  try {
    authStore.logout()
    await router.push('/login')
    toast.add({
      severity: 'info',
      summary: 'Logout',
      detail: 'Você foi desconectado com sucesso',
      life: 3000
    })
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Ocorreu um erro ao fazer logout. Tente novamente.',
      life: 3000
    })
  }
}
</script>

<style scoped>
:deep(.p-menubar-button) {
  order: -1 !important;
}
</style>
