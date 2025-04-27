import request from '@/utils/request.ts'

// 用户登录
export const userLogin = (userName: string, userPassword: string) => {
  return  request.post('/api/auth/login',{
    userName,
    userPassword,
  })
}

// 用户注册 /api/usercenter
export const userRegister = (userName: string, userEmail: string, userPassword: string, confirmPassword:string) => {
  return request.post('/api/usercenter', {
    userEmail,
    userName,
    userPassword,
    confirmPassword
  })
}

// 用户信息
export const getUserInfoApi = (id:string) => {
  return request.get(`/api/usercenter/${id}`)
}

// 验证 token
export const verifyToken = () => {
  return request.get('/api/auth/profile')
}
