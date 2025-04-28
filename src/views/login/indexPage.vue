<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.ts'
import BackgroundAnimation from '@/components/BackgroundAnimation.vue'

onMounted(() => {
  // 检查用户是否已登录
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})

const authStore = useUserStore()
const router = useRouter()

// 登录/注册模式切换
const isLoginMode = ref(true)
const showPasswordRequirements = ref(false)

// 登录相关状态
const loginUserNum = ref("")
const loginUserPas = ref("")
const loginError = ref("")

// 注册相关状态
const registerUserNum = ref("")
const registerEmail = ref("")
// const registerPhone = ref("")
const registerPassword = ref("")
const registerConfirmPassword = ref("")
const registerError = ref("")

// 密码必须包含大小写字母和数字，可以包含特殊符号
const validatePassword = (password: string): string => {
  if (password.length < 6 || password.length > 12) {
    return "密码长度必须为6-12位";
  }
  // 至少一个小写字母、一个大写字母、一个数字
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?！@#￥%……&*（）——+【】{}；’：“”、，。《》？]+$/;

  if (!passwordRegex.test(password)) {
    return "密码必须包含大小写字母和数字，可以包含特殊符号";
  }
  return "";
}


// 用户名长度应在 4 到 20 个字符之间
const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{4,20}$/
  return usernameRegex.test(username)
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// const validatePhone = (phone: string): boolean => {
//   const phoneRegex = /^1[3-9]\d{9}$/
//   return phoneRegex.test(phone)
// }

// 登录处理
const handleLogin = async () => {
  loginError.value = ""
  if (!loginUserNum.value.trim() || !loginUserPas.value.trim()) {
    loginError.value = "用户名和密码不能为空"
    return
  }
  try {
    await authStore.login(loginUserNum.value, loginUserPas.value)
  } catch (error) {
    loginError.value = '登录过程中出现错误'
    console.error('登录错误:', error)
  }
}

// 注册处理
const handleRegister = async () => {
  registerError.value = ""

  // 验证所有必填字段
  if (!registerUserNum.value || !registerEmail.value || !registerPassword.value || !registerConfirmPassword.value) {
    registerError.value = "所有字段都是必填的"
    return
  }

   // 验证用户名
  if (!validateUsername(registerUserNum.value)) {
    registerError.value = "用户名长度应在4到20个字符之间"
    return
  }

  // 验证邮箱格式
  if (!validateEmail(registerEmail.value)) {
    registerError.value = "请输入有效的邮箱地址"
    return
  }

  // 验证手机号格式
  // if (!validatePhone(registerPhone.value)) {
  //   registerError.value = "请输入有效的手机号码"
  //   return
  // }

  // 验证密码
  const passwordError = validatePassword(registerPassword.value)
  if (passwordError) {
    registerError.value = passwordError
    return
  }

  // 验证两次密码是否一致
  if (registerPassword.value !== registerConfirmPassword.value) {
    registerError.value = "两次输入的密码不一致"
    return
  }

  try {
    const result = await authStore.register(registerUserNum.value, registerEmail.value, registerPassword.value, registerConfirmPassword.value)
    // 注册成功后处理
    // console.log('注册结果3:', result)
    if (result) {
      isLoginMode.value = true
      loginUserNum.value = registerUserNum.value
      registerUserNum.value = ""
      registerEmail.value = ""
      // registerPhone.value = ""
      registerPassword.value = ""
      registerConfirmPassword.value = ""
      loginError.value = "注册成功，请登录"
    } else {
      loginError.value = "注册失败"
    }

  } catch (error) {
    registerError.value = '注册过程出现异常'
    console.error('注册错误:', error)
  }
}

const switchToRegister = () => {
  isLoginMode.value = false
  showPasswordRequirements.value = false
  loginError.value = ""
  loginUserNum.value = ""
  loginUserPas.value = ""
}

const switchToLogin = () => {
  isLoginMode.value = true
  showPasswordRequirements.value = false
  registerError.value = ""
  registerUserNum.value = ""
  registerEmail.value = ""
  registerPassword.value = ""
  registerConfirmPassword.value = ""
}
</script>

<template>
  <div class="relative w-screen h-screen overflow-hidden">
    <BackgroundAnimation class="absolute inset-0 top-[-5vh] -z-10"></BackgroundAnimation>
    <div class="flex justify-center items-center w-full h-full flex-col">
      <div class="w-[40vw] h-[5vw] relative flex justify-center items-center mb-[1.5vw]">
        <div class="w-[5vw] h-[5vw] mr-[1vw] bg-[url(@/assets/img/Login/Logo2.png)] bg-contain bg-no-repeat"></div>
        <span class="text-[2vw]">CP-ResumeTools</span>
      </div>

      <div
        class="relative bg-[rgb(255,255,255)] w-[45rem] h-[30rem] shadow-2xl flex justify-center items-center flex-col">
        <span class="absolute left-[5rem] top-[3rem] text-[25px] font-bold">
          {{ isLoginMode ? '登录' : '注册' }}
        </span>

        <div v-if="isLoginMode && loginError"
             class="absolute top-[4.5rem] text-red-500 text-sm bg-red-50 px-4 py-2 rounded">
          {{ loginError }}
        </div>
        <div v-if="!isLoginMode && registerError"
             class="absolute top-[4.5rem] text-red-500 text-sm bg-red-50 px-4 py-2 rounded">
          {{ registerError }}
        </div>

        <!-- 登录表单 -->
        <div v-if="isLoginMode" class="relative w-1/2 h-1/2 flex justify-center items-center flex-col">
          <input type="text"
                 class="w-[25rem] h-[2.8rem] mb-3 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
                 placeholder="输入账户" v-model="loginUserNum">
          <input type="password"
                 class="w-[25rem] h-[2.8rem] mb-3 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
                 placeholder="输入密码" v-model="loginUserPas" @keyup.enter="handleLogin">
          <span
            class="absolute right-[-1rem] bottom-[0] text-[rgb(78,131,255)] text-[13px] cursor-pointer hover:underline"
            @click="switchToRegister">
            注册账户
          </span>
        </div>

        <!-- 注册表单 -->
        <div v-if="!isLoginMode" class="relative w-1/2 h-1/2 flex justify-center items-center flex-col">
          <input type="text"
                 class="w-[25rem] h-[2rem] mb-1 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
                 v-model="registerUserNum" placeholder="输入用户名">
          <input type="text"
                 class="w-[25rem] h-[2rem] mb-3 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
                 placeholder="输入邮箱" v-model="registerEmail">
          <input type="password"
                 class="w-[25rem] h-[2rem] mb-1 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
                 v-model="registerPassword" placeholder="输入密码"
                 @focus="showPasswordRequirements = true"
                 @blur="showPasswordRequirements = false"
                 @keyup.enter="handleRegister">
          <input type="password"
                 class="w-[25rem] h-[2rem] mb-1 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
                 v-model="registerConfirmPassword" placeholder="确认密码" @keyup.enter="handleRegister">

          <!-- 动态显示密码要求 -->
          <div v-if="showPasswordRequirements" class="w-[25rem] text-xs text-gray-600 mb-3 px-2 py-2 rounded bg-gray-50">
            <div class="font-medium mb-1">密码要求:</div>
            <ul class="list-disc pl-4">
              <li>长度6-12位字符</li>
              <li>必须包含字母和数字</li>
              <li>可以包含特殊符号</li>
            </ul>
          </div>

          <span class="absolute right-[-1rem] bottom-0 text-[rgb(145,145,145)] text-[13px]">
            已有账户？
            <span class="text-[rgb(78,131,255)] cursor-pointer hover:underline" @click="switchToLogin">
              立即登录
            </span>
          </span>
        </div>

        <div class="w-1/2 flex justify-around">
          <button
            class="text-[#79747E] border-1 border-[#79747E] w-[5rem] h-[2.2rem] rounded-sm hover:bg-[#3370FF] hover:border-0 hover:text-[#ffff]"
            @click="isLoginMode ? handleLogin() : handleRegister()">
            确定
          </button>
          <button
            class="text-[#79747E] border-1 border-[#79747E] w-[5rem] h-[2.2rem] rounded-sm hover:bg-[#3370FF] hover:border-0 hover:text-[#ffff]"
            @click="isLoginMode ? router.push('/') : switchToLogin()">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

input:focus {
  outline: 2px solid #3370FF;
  border-color: transparent;
}
</style>
