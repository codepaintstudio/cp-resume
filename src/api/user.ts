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

//关于用户更新的插槽
export interface userInfoUpdate{
  userName:string,
  userPhoneNumber:string,
  userEmail:string,
  avatar:string
}

// 更新用户信息
export const userUpdate = (id: string, data: userInfoUpdate) => {
  return request.patch(`/api/usercenter/${id}`, data)
}


// 验证 token
export const verifyToken = () => {
  return request.get('/api/auth/profile')
}

export const uploadAvatar = (file: File) => {
  const formData = new FormData()
  formData.append('file', file) // 字段名根据后端要求可能是 'file' 或 'avatar'

  return request.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // 必须设置
    }
  }).then(res => {
    return res.data?.url || res.data?.avatar // 返回头像URL
  })
}

export const getUploadedFiles = (params: { page: number; limit: number }) => {
  return request.get('/api/upload', { params })
}
