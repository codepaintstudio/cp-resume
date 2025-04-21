import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface UserData {
  userId: number
  userName: string
  userEmail: string
  userPhoneNumber: string
  userAuth: number
  userResumeId: number
  userStatus: number
}

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(!!localStorage.getItem('currentUser'))
  const currentUser = ref<UserData | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setLoginStatus = (status: boolean, userData: UserData | null = null) => {
    isLogin.value = status
    if (status && userData) {
      currentUser.value = userData
      localStorage.setItem('currentUser', JSON.stringify(userData))
    } else {
      currentUser.value = null
      localStorage.removeItem('currentUser')
    }
  }
///////////////////////////
  const login = async (credentials: { userName: string; userPassword: string }) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.post('http://47.109.193.161:8543/api/usercenter/login', credentials)

      if (response.data.code === 200) {
        setLoginStatus(true, response.data.data)
        return { success: true, data: response.data.data }
      } else {
        throw new Error(response.data.message || '登录失败')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '登录错误'
      return { success: false, message: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // stores/userStatus.ts
const register = async (registerData: {
  userName: string;
  userPassword: string;
  userEmail: string;
  userPhoneNumber: string;
}) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.post(
      'http://47.109.193.161:8543/api/usercenter',
      {
        userEmail: registerData.userEmail,
        userPhoneNumber: registerData.userPhoneNumber,
        userAuth: 1, // 默认权限
        userResumeId: 0, // 初始值
        userStatus: 1, // 激活状态
        userEmailId: 0, // 初始值
        lastLoginIp: window.location.hostname || '127.0.0.1',
        createBy: 'frontend',
        updateBy: 'frontend',
        userName: registerData.userName,
        userPassword: registerData.userPassword
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.code === 200) {
      return {
        success: true,
        data: response.data.data,
        message: '注册成功'
      };
    } else {
      throw new Error(response.data.message || '注册失败');
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '注册请求失败';
    return {
      success: false,
      message: error.value.includes('404')
        ? '注册API路径错误，请联系管理员'
        : error.value
    };
  } finally {
    isLoading.value = false;
  }
};

  return {
    isLogin,
    currentUser,
    isLoading,
    error,
    setLoginStatus,
    login,
    register
  }
})
