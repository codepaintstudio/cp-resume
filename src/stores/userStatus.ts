import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const isLogin = ref(!!localStorage.getItem('currentUser'))

  // Actions
  const setLoginStatus = (status: boolean) => {
    isLogin.value = status
  }

  return {
    isLogin,
    setLoginStatus
  }
})
