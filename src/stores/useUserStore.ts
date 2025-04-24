import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userLogin, getUserInfoApi } from '@/api/user.ts'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string>(localStorage.getItem('userId') || '0')
  const accessToken  = ref(localStorage.getItem('cp-accessToken') || '')
  const refreshToken = ref(localStorage.getItem('cp-refreshToken') || '')
  let userInfo =  ref({})
  const router = useRouter()

  // 根据 accessToken 是否存在来判断登录状态
  const isLoggedIn = computed(() => !!accessToken.value)

  // 用户登录
  const login = async (userName: string, userPassword: string) => {
    try {
      const { data } = await userLogin(userName, userPassword)
      console.log('登录成功', data)
      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      userId.value = String(data.userId)
      localStorage.setItem('userId', userId.value)
      localStorage.setItem('cp-accessToken', accessToken.value)
      localStorage.setItem('cp-refreshToken', refreshToken.value)
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // 用户登出
  const logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('cp-accessToken')
    localStorage.removeItem('cp-refreshToken')
    router.push('/login')
  }
  // 用户信息
  const getUserInfo = async (userId: string) => {
    try {
      const res  = await getUserInfoApi(userId)
      userInfo.value = res.data
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }
  return {
    accessToken,
    refreshToken,
    isLoggedIn,
    userId,
    userInfo,
    getUserInfo,
    login,
    logout
  }
})
