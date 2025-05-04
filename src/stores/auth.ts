import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginFormData } from '../validations/loginSchema'
import type { User } from '../interfaces'
import bcrypt from 'bcryptjs'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)
  const sessionTimeout = 1000 * 60 * 60 * 24 // 24 horas

  const login = async (credentials: LoginFormData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find((u: LoginFormData) => u.email === credentials.email)

    if (foundUser && await bcrypt.compare(credentials.password, foundUser.password)) {
      isAuthenticated.value = true
      user.value = {
        email: foundUser.email,
        lastLogin: new Date().toISOString()
      }

      // Salva a sessão com timestamp
      const session = {
        user: user.value,
        expiresAt: new Date(Date.now() + sessionTimeout).toISOString()
      }
      localStorage.setItem('session', JSON.stringify(session))
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('session')
  }

  const register = async (credentials: LoginFormData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = users.some((u: LoginFormData) => u.email === credentials.email)

    if (userExists) {
      return false
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(credentials.password, 10)
    const newUser = {
      ...credentials,
      password: hashedPassword
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  const checkAuth = () => {
    const session = localStorage.getItem('session')
    if (session) {
      const { user: sessionUser, expiresAt } = JSON.parse(session)

      // Verifica se a sessão expirou
      if (new Date(expiresAt) > new Date()) {
        isAuthenticated.value = true
        user.value = sessionUser
      } else {
        // Se expirou, faz logout
        logout()
      }
    }
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    checkAuth
  }
})
