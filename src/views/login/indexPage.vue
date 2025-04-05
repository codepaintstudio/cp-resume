<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/userStatus'
import BackgroundAnimation from '@/components/BackgroundAnimation.vue'


//调用useAuthStore
const authStore = useAuthStore()
//
const router = useRouter()
const isLoginMode = ref(true)
const showPasswordRequirements = ref(false)

// 登录相关状态
const loginUserNum = ref("")
const loginUserPas = ref("")

const loginError = ref("")

// 注册相关状态
const registerUserNum = ref("")
const registerPassword = ref("")
const registerError = ref("")
// 类型安全 + 错误处理
const RuserList = ref(
  JSON.parse(localStorage.getItem('RuserList') || '[]') // 确保输入是字符串
)
onMounted(() => {
  checkLoginStatus()
})

const checkLoginStatus = () => {
  const hasUser = !!localStorage.getItem('currrentUser')
  authStore.setLoginStatus(hasUser)
}

const validatePassword = (password: string): string => {
  if (password.length < 6 || password.length > 12) {
    return "密码长度必须为6-12位"
  }

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
  if (!passwordRegex.test(password)) {
    return "密码必须包含字母和数字，可以包含特殊符号"
  }

  return ""
}

const handleLogin = () => {
  loginError.value = ""

  if (!loginUserNum.value || !loginUserPas.value) {
    loginError.value = "用户名和密码不能为空"
    return
  }

  try {
    const storedUsers = JSON.parse(localStorage.getItem('RuserList') || '[]')
    const matchedUser = storedUsers.find(user =>
      user.userNum === loginUserNum.value &&
      user.UpassWord === loginUserPas.value
    )

    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser))
      authStore.setLoginStatus(true)
      router.push('/user')
    } else {
      loginError.value = '用户名或密码错误'
      loginUserPas.value = ''
    }
  } catch (error) {
    loginError.value = '登录过程出现异常'
    console.error(error)
  }
}

const handleRegister = () => {
  registerError.value = ""
  showPasswordRequirements.value = false

  try {
    const existingUser = RuserList.value.find(
      user => user.userNum === registerUserNum.value
    )

    if (existingUser) {
      registerError.value = "该用户名已存在"
      return
    }

    const newUser = {
      userNum: registerUserNum.value,
      UpassWord: registerPassword.value
    }

    RuserList.value.push(newUser)
    localStorage.setItem('RuserList', JSON.stringify(RuserList.value))

    // 注册成功后处理 ✅
    isLoginMode.value = true
    registerUserNum.value = ""
    registerPassword.value = ""
    alert('注册成功，请登录')

  } catch (error) {
    registerError.value = '注册过程出现异常'
    console.error(error)
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
  registerPassword.value = ""
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

      <div class="relative bg-[rgb(255,255,255)] w-[45rem] h-[30rem] shadow-2xl flex justify-center items-center flex-col">
        <span class="absolute left-[5rem] top-[3rem] text-[25px] font-bold">
          {{ isLoginMode ? '登录' : '注册' }}
        </span>

        <div
          v-if="isLoginMode && loginError"
          class="absolute top-[4.5rem] text-red-500 text-sm bg-red-50 px-4 py-2 rounded"
        >
          {{ loginError }}
        </div>
        <div
          v-if="!isLoginMode && registerError"
          class="absolute top-[4.5rem] text-red-500 text-sm bg-red-50 px-4 py-2 rounded"
        >
          {{ registerError }}
        </div>

        <!-- 登录表单 -->
        <div v-if="isLoginMode" class="relative w-1/2 h-1/2 flex justify-center items-center flex-col">
          <input
            type="text"
            class="w-[25rem] h-[2.8rem] mb-3 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
            placeholder="输入账户"
            v-model="loginUserNum"
          >
          <input
            type="password"
            class="w-[25rem] h-[2.8rem] mb-3 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
            placeholder="输入密码"
            v-model="loginUserPas"
            @keyup.enter="handleLogin"
          >
          <span
            class="absolute right-[-1rem] bottom-[1.5rem] text-[rgb(78,131,255)] text-[13px] cursor-pointer hover:underline"
            @click="switchToRegister"
          >
            注册账户
          </span>
        </div>

        <!-- 注册表单 -->
        <div v-if="!isLoginMode" class="relative w-1/2 h-1/2 flex justify-center items-center flex-col">
          <input
            type="text"
            class="w-[25rem] h-[2.8rem] mb-3 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
            v-model="registerUserNum"
            placeholder="输入用户名"
          >
          <input
            type="password"
            class="w-[25rem] h-[2.8rem] mb-1 border-[reg(121,116,126)] border-1 rounded-sm pl-[1.8rem] text-[#79747E] text-[15px]"
            v-model="registerPassword"
            placeholder="输入密码"
            @keyup.enter="handleRegister"
          >
           <!-- 动态显示密码要求 -->
          <div
            v-if="showPasswordRequirements"
            class="w-[25rem] text-xs text-red-500 mb-3 px-2 py-2 rounded"
          >
            <div class="font-medium mb-1">密码要求:</div>
            <ul class="list-disc pl-4">
              <li>长度6-12位字符</li>
              <li>必须包含字母和数字</li>
              <li>可以包含特殊符号</li>
            </ul>
          </div>
          <span class="absolute right-[-1rem] bottom-[1.5rem] text-[rgb(145,145,145)] text-[13px]">
            已有账户？
            <span
              class="text-[rgb(78,131,255)] cursor-pointer hover:underline"
              @click="switchToLogin"
            >
              立即登录
            </span>
          </span>
        </div>


        <div class="w-1/2 flex justify-around">
          <button
            class="text-[#79747E] border-1 border-[#79747E] w-[5rem] h-[2.2rem] rounded-sm hover:bg-[#3370FF] hover:border-0 hover:text-[#ffff]"
            @click="isLoginMode ? handleLogin() : handleRegister()"
          >
            确定
          </button>
          <button
            class="text-[#79747E] border-1 border-[#79747E] w-[5rem] h-[2.2rem] rounded-sm hover:bg-[#3370FF] hover:border-0 hover:text-[#ffff]"
            @click="isLoginMode ? router.push('/') : switchToLogin()"
          >
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
