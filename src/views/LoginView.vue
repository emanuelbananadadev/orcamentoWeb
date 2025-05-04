<template>
  <div class="flex justify-center items-center min-h-screen ">
    <Toast />
    <div class="w-full max-w-[450px] p-8">
      <div class="p-8 rounded-2xl border border-surface-200 dark:border-surface-800">
        <div class="logo-container flex justify-center items-center mb-8">
          <img src="../assets/logo-colorido.png" alt="logo" class="block dark:hidden h-12 w-48">
          <img src="../assets/logo-dark.png" alt="logo" class="hidden dark:block h-12 w-48">
        </div>

        <div class="mb-6">
          <FloatLabel variant="on">
            <InputText v-model="formData.email" class="w-full" :class="{ 'p-invalid': errors.email }" />
            <label>Email</label>
          </FloatLabel>
          <small class="text-red-500 text-sm mt-1 block" v-if="errors.email">{{ errors.email }}</small>
        </div>

        <div class="mb-6">
          <FloatLabel variant="on">
            <Password v-model="formData.password" class="w-full [&_.p-password]:!flex [&_.p-password-input]:!w-full"
              toggleMask :class="{ 'p-invalid': errors.password }" />
            <label>Senha</label>
          </FloatLabel>
          <small class="text-red-500 text-sm mt-1 block" v-if="errors.password">{{ errors.password }}</small>
        </div>

        <div class="flex flex-row gap-4 mt-8">
          <Button label="Entrar" class="p-button-primary w-full p-3 text-lg" @click="handleLogin" />
          <Button label="Registrar" class="p-button-secondary w-full p-3 text-lg" @click="handleRegister" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'
import { loginSchema, type LoginFormData } from '../validations/loginSchema'
import Toast from 'primevue/toast'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FloatLabel from 'primevue/floatlabel'
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const formData = reactive<LoginFormData>({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const clearErrors = () => {
  errors.email = ''
  errors.password = ''
}

const handleValidation = (isRegistering = false) => {
  clearErrors()
  const result = loginSchema.safeParse(formData)

  if (!result.success && isRegistering) {
    result.error.errors.forEach((error) => {
      const field = error.path[0] as keyof typeof errors
      errors[field] = error.message
    })
    return false
  }
  return true
}

const handleLogin = async () => {
  try {
    clearErrors()
    const success = await authStore.login(formData)

    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Login realizado com sucesso',
        life: 3000
      })
      router.push('/orcamentos')
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Email ou senha inválidos',
        life: 3000
      })
    }
  } catch (error) {
    console.error('Erro no login:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Ocorreu um erro ao fazer login. Tente novamente.',
      life: 3000
    })
  }
}

const handleRegister = async () => {
  try {
    if (!handleValidation(true)) return

    const success = await authStore.register(formData)
    if (success) {
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Conta criada com sucesso! Agora você pode fazer login.',
        life: 3000
      })
      formData.email = ''
      formData.password = ''
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Este email já está cadastrado',
        life: 3000
      })
    }
  } catch (error) {
    console.error('Erro no registro:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Ocorreu um erro ao criar a conta. Tente novamente.',
      life: 3000
    })
  }
}
</script>

<style scoped>
:deep(.p-password-input) {
  width: 100%;
}

:deep(.p-button) {
  transition: all 0.2s ease;
}

:deep(.p-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
