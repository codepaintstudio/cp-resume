import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { AxiosError } from 'axios';

// 更新 UserData 接口，匹配后端返回的完整字段
interface UserData {
  userId: number;
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
  userAuth: number;
  userResumeId: number;
  userStatus: number;
  createTime?: string;
  updateTime?: string;
  createBy?: string;
  updateBy?: string;
  userEmailId?: number;
  lastLoginIp?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(!!localStorage.getItem('currentUser'));
  const currentUser = ref<UserData | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const setLoginStatus = (status: boolean, userData: UserData | null = null) => {
    isLogin.value = status;
    if (status && userData) {
      currentUser.value = userData;
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } else {
      currentUser.value = null;
      localStorage.removeItem('currentUser');
    }
  };

  const login = async (credentials: { userName: string; userPassword: string }) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.post('http://47.109.193.161:8543/api/auth/login', credentials);
      console.log("登录响应:", response.data);

      if (response.data.code === 200) {
        const { access_token, userId } = response.data.data;

        // 保存 Token 到 localStorage（可选）
        localStorage.setItem('access_token', access_token);

        // 获取完整用户详情
        const { success, data: userDetails } = await fetchUserDetails(userId);
        if (success && userDetails) {
          setLoginStatus(true, userDetails);
          return { success: true, data: userDetails };
        } else {
          throw new Error('获取用户详情失败');
        }
      } else {
        throw new Error(response.data.message || '登录失败');
      }
    } catch (err) {
      const message = (err as AxiosError).response?.data?.message || (err as Error).message;
      error.value = message;
      return { success: false, message };
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUserDetails = async (userId: number) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`http://47.109.193.161:8543/api/usercenter/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // 传递 Token
        },
      });
      console.log("用户详情响应:", response.data);

      if (response.data.code === 200) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || '获取用户详情失败');
      }
    } catch (err) {
      const message = (err as AxiosError).response?.data?.message || (err as Error).message;
      error.value = message;
      return { success: false, message };
    } finally {
      isLoading.value = false;
    }
  };

  // register 方法保持不变
  const register = async (registerData: {
    userName: string;
    userPassword: string;
    userEmail: string;
    userPhoneNumber: string;
  }) => {
    // ...原有实现
  };

  return {
    isLogin,
    currentUser,
    isLoading,
    error,
    setLoginStatus,
    login,
    register,
    fetchUserDetails,
  };
});
