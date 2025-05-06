import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface UserInfo {
  userId: string,
  userEmail: string,
  userPhoneNumber?: string,
  userAuth: number,
  userResumeId?: number,
  userStatus: number,
  userEmailId?: number,
  lastLoginIp?: string,
  userName: string,
  sex: number,
  avatar: string,
}

export interface UserState {
  userId: string
  accessToken: string
  isLoggedIn: boolean
  userInfo: UserInfo
}

const router = useRouter()

export const useUserStore = defineStore('user', () => {
  // 使用一个单独的响应式对象来存储用户状态
  const userStatus = ref<UserState>({
    userId: localStorage.getItem('userId') || '',
    accessToken: localStorage.getItem('cp-accessToken') || '',
    isLoggedIn: !!localStorage.getItem('cp-accessToken'),
    userInfo: {} as UserInfo
  })

  // 在store中仅仅提供logout方法，其余方法由组件提供
  const logout = () => {
    userStatus.value = {
      userId: '',
      accessToken: '',
      isLoggedIn: false,
      userInfo: {} as UserInfo
    }
    localStorage.removeItem('cp-accessToken')
    localStorage.removeItem('userId')
    router.push('/login')
  }

  // 对外暴露store
  return {
    userStatus,
    logout,
  }
})
