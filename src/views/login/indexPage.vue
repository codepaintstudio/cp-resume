<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.ts'
import BackgroundAnimation from '@/components/BackgroundAnimation.vue'
import { userLogin, userRegister, getUserInfoApi } from '@/api/user.ts'
import { ElMessage } from 'element-plus'

// 用户状态
const userStore = useUserStore()
const router = useRouter()

// 定义登录/注册模式
enum FormType {
  Login = 'login',
  Register = 'register',
}

// 登录/注册模式切换
const formType = ref<FormType>(FormType.Login)

// 登录相关状态
const loginForm = ref({
  username: '',
  password: '',
})

// 注册相关状态
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 登录处理
const handleLogin = async () => {
  if (!loginForm.value.username.trim() || !loginForm.value.password.trim()) {
    ElMessage.error('请输入用户名和密码')
    return
  }
  try {
    // 登录
    const data = await userLogin(loginForm.value.username, loginForm.value.password)
    userStore.userStatus.accessToken = data.data.access_token
    // 获取用户信息
    const userInfo = await getUserInfoApi(data.data.userId)
    // 更新用户状态
    userStore.userStatus = {
      userId: data.data.userId,
      accessToken: data.data.access_token,
      isLoggedIn: true,
      userInfo: userInfo.data,
    }
    // 存储用户状态
    localStorage.setItem('userId', data.data.userId)
    // 跳转到首页
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
  }
}

// 注册处理
const handleRegister = async () => {
  try {
    await userRegister(
      registerForm.value.username,
      registerForm.value.email,
      registerForm.value.password,
      registerForm.value.confirmPassword,
    )
    ElMessage.success('注册成功')
    // 切换到登录模式
    formType.value = FormType.Login
  } catch (error) {
    ElMessage.error('注册失败，请检查信息')
  }
}
</script>

<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <BackgroundAnimation class="absolute inset-0 top-[-5vh] -z-10" />
    <div class="flex justify-center items-center w-full h-full flex-col">
      <!-- Logo -->
      <div class="w-[40vw] h-[5vw] relative flex justify-center items-center mb-[1.5vw]">
        <img src="@/assets/img/Login/Logo2.png" class="w-[5vw] h-[5vw] mr-[1vw]" alt="" />
        <h2 class="text-6xl font-bold">CP-ResumeTools</h2>
      </div>

      <!-- Form -->
      <div
        class="bg-white w-[45rem] h-[30rem] p-[2rem] shadow-2xl flex justify-between items-center flex-col"
      >
        <!-- Title -->
        <h2 class="text-4xl font-bold">
          {{ formType === FormType.Login ? '登录' : '注册' }}
        </h2>

        <!-- Login Form -->
        <el-form
          :model="loginForm"
          v-if="formType === FormType.Login"
          label-position="left"
          label-width="80px"
          class="p-[2rem] w-full flex flex-col justify-center items-center"
        >
          <el-form-item
            label="用户名"
            prop="username"
            class="w-full flex items-center"
            :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
          >
            <el-input type="text" placeholder="输入用户名" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            class="w-full flex items-center"
            :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
          >
            <el-input
              type="password"
              placeholder="输入密码"
              v-model="loginForm.password"
              show-password
            />
          </el-form-item>
        </el-form>
        <!-- Register Form -->
        <el-form
          v-if="formType === FormType.Register"
          :model="registerForm"
          label-position="left"
          label-width="80px"
          class="p-[2rem] w-full flex flex-col justify-center"
        >
          <el-form-item
            label="用户名"
            prop="username"
            class="w-full flex items-center"
            :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
          >
            <el-input type="text" placeholder="输入用户名" v-model="registerForm.username" />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            class="w-full flex items-center"
            :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]"
          >
            <el-input type="text" placeholder="输入邮箱" v-model="registerForm.email" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            class="w-full flex items-center"
            :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
          >
            <el-input
              type="password"
              placeholder="输入密码"
              v-model="registerForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="confirmPassword"
            class="w-full flex items-center"
            :rules="[{ required: true, message: '请输入确认密码', trigger: 'blur' }]"
          >
            <el-input
              type="password"
              placeholder="确认密码"
              v-model="registerForm.confirmPassword"
              show-password
            />
          </el-form-item>
        </el-form>
        <!-- info -->
        <div class="w-4/5 mt-[1rem] mb-[1rem] flex justify-end items-center text-sm">
          {{ formType === FormType.Login ? '没有账户？' : '已经有账户？' }}
          <el-button
            type="text"
            @click="
              formType === FormType.Login
                ? (formType = FormType.Register)
                : (formType = FormType.Login)
            "
          >
            {{ formType === FormType.Login ? '立即注册' : '立即登录' }}
          </el-button>
        </div>
        <!-- Buttons -->
        <div class="w-4/5 flex justify-between">
          <el-button
            type="primary"
            size="large"
            class="w-1/3"
            @click="formType === FormType.Login ? handleLogin() : handleRegister()"
          >
            {{ formType === FormType.Login ? '登录' : '注册' }}
          </el-button>
          <el-button type="default" size="large" class="w-1/3" @click="router.push('/')">
            取消
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
