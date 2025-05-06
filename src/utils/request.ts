import axios from 'axios'
import { useUserStore } from '@/stores/useUserStore'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: 'https://cp-center-server.hub.feashow.cn',
  timeout: 50000,
})

const userStore = useUserStore()

service.interceptors.request.use(
  (config) => {
    let accessToken = userStore.userStatus.accessToken
    if (config?.url?.endsWith('/auth/login') && config.method === 'post') {
      return config
    }
    if (config?.url?.includes('/auth/refresh')) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    } else {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const { response } = error
    console.log('response', response)
    if (response && response.status === 401) {
      ElMessage.error('登录过期，请重新登录')
      userStore.logout()
      return Promise.reject(error)
    } else if (response && response.status === 500) {
      ElMessage.error('服务器错误，请稍后再试')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  },
)
export default service
