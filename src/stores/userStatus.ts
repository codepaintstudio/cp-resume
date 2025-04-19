import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const isLogin = ref(!!localStorage.getItem('currentUser'))
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))

  // Actions
  const setLoginStatus = (status: boolean, userData: any = null) => {
    isLogin.value = status
    if (status && userData) {
      currentUser.value = userData
      localStorage.setItem('currentUser', JSON.stringify(userData))
    } else {
      currentUser.value = null
      localStorage.removeItem('currentUser')
    }
  }

  return {
    isLogin,
    currentUser,
    setLoginStatus
  }
})
