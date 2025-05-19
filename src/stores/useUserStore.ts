import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userLogin, getUserInfoApi, userRegister,userUpdate,uploadAvatar } from '@/api/user.ts'
import {getResumeList} from '@/api/resume.ts'
import { useRouter } from 'vue-router'
import { showMessage } from '@/utils/message.ts'

interface UserInfo {
  userName: string;
  userPhoneNumber: string;
  userEmail: string;
  avatar: string;
}

export const useUserStore = defineStore('user', () => {
  const userId = ref<string>(localStorage.getItem('userId') || '0')
  const accessToken  = ref(localStorage.getItem('cp-accessToken') || '')
  const refreshToken = ref(localStorage.getItem('cp-refreshToken') || '')
  const userCvTotal = ref(0)
  let userInfo =  ref<UserInfo>({
    userName: '',
    userPhoneNumber: '',
    userEmail: '',
    avatar: ''
  })
  const router = useRouter()

  // 根据 accessToken 是否存在来判断登录状态
  const isLoggedIn = computed(() => !!localStorage.getItem('cp-refreshToken'))

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
      await getUserCvTotal(userId.value)
      router.replace('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  // 用户注册
  const register = async (userName: string, userEmail: string, userPassword: string, confirmPassword:string) => {
    try {
      const res = await userRegister(userName, userEmail, userPassword, confirmPassword)
      showMessage({
        message: '注册成功',
        type: 'success'
      })
      return res
    } catch (error) {
      showMessage({
        message: '注册失败',
        type: 'error'
      })
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
      showMessage({
        message: '获取用户信息失败',
        type: 'error'
      })
    }
  }
  const updateUserInfo = async (userId: string, data: any) => {
    try {
      const res = await userUpdate(userId, data)
      userInfo.value = { ...userInfo.value, ...data }
      return res
    } catch (error) {
      console.error('更新用户信息失败', error)
      throw error
    }
  }

  const getUserCvTotal = async (userId: string) => {
    try {
      const res = await getResumeList(1, 10000)
      userCvTotal.value = res.data.items.filter((item: {resumeUserId: number}) => String(item.resumeUserId) === userId).length
    } catch (error) {
      console.error('获取用户简历数量失败', error)
      throw error
    }
  }

  // 新增：使用FormData更新用户信息（含头像）
  const updateUserInfoWithAvatar = async (file: File) => {
    try {
      // 上传头像
      const avatarUrl = await uploadAvatar(file);

      // 更新用户信息
      await updateUserInfo(userId.value, {
        avatar: avatarUrl
      });

      // 刷新用户数据
      await getUserInfo(userId.value);

      return avatarUrl;
    } catch (error) {
      console.error('更新用户头像失败', error);
      throw error;
    }
  }



  return {
    accessToken,
    refreshToken,
    isLoggedIn,
    userId,
    userInfo,
    userCvTotal,
    getUserInfo,
    updateUserInfo,
    updateUserInfoWithAvatar,
    login,
    register,
    logout
  }
})
