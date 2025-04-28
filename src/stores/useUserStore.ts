import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userLogin, getUserInfoApi, userRegister } from '@/api/user.ts'
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
      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      userId.value = String(data.userId)
      localStorage.setItem('userId', userId.value)
      localStorage.setItem('cp-accessToken', accessToken.value)
      localStorage.setItem('cp-refreshToken', refreshToken.value)
      await getUserInfo(userId.value)
      router.replace('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // 用户注册
  const register = async (userName: string, userEmail: string, userPassword: string, confirmPassword:string) => {
    try {
      const res = await userRegister(userName, userEmail, userPassword, confirmPassword)
      // console.log('注册成功res',res)
      return res
    } catch (error) {
      console.error('Register failed:', error)
    }
  }

  // 用户登出
  const logout = () => {
    accessToken.value = ''
    refreshToken.value = ''
    userId.value = ''
    localStorage.removeItem('cp-accessToken')
    localStorage.removeItem('cp-refreshToken')
    localStorage.removeItem('userId')
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
    register,
    logout
  }
})
