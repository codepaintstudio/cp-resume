import axios from 'axios'
import router from '@/router'

const service = axios.create({
  baseURL: 'https://cp-center-server.hub.feashow.cn', // ✔ 把 /api 放到这里
  timeout: 50000,
})
let isRefreshing = false
let requestQueue: Array<(newAT: string) => void> = []

service.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem('cp-accessToken')
    let refreshToken = localStorage.getItem('cp-refreshToken')
    if (config?.url?.endsWith('/auth/login') && config.method === 'post') {
      return config
    }
    if (config?.url?.includes('/auth/refresh')) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`
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

  async (error) => {
    const { config, response } = error
    // 如果是/auth/login并且是401就返回登录失败
    if (config?.url?.endsWith('/auth/login') && response && response.status === 401) {
      alert('登录失败')
      return Promise.reject('登录失败')
    } else if (config?.url?.endsWith('/auth/login') && response && response.status === 500){
      alert('请输入正确的用户名')
      return Promise.reject('登录失败')
    }

    if (response && response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          const newAT = await doRefresh()
          requestQueue.forEach((cb: (newAT: string) => void) => cb(newAT))
          requestQueue = []
          config.headers['Authorization'] = `Bearer ${newAT}`
          console.log('重试请求', config)
          return service.request(config)
        } catch (_) {
          console.error('刷新 Token 失败')
          localStorage.removeItem('cp-accessToken')
          localStorage.setItem('cp-refreshToken', '')
          router.replace('/login')
          return Promise.reject(error)
        } finally {
          isRefreshing = false
        }
      } else {
        return new Promise((resolve) => {
          requestQueue.push((newAT: string) => {
            config.headers['Authorization'] = `Bearer ${newAT}`
            resolve(service.request(config))
          })
        })
      }
    }
    return Promise.reject(error)
  },
)

async function doRefresh() {
  let refreshToken = localStorage.getItem('cp-refreshToken')
  try {
    const resp = await axios.get('http://47.109.193.161:8543/api/auth/refresh', {
      params: {
        refreshToken,
      },
    })
    const { access_token: newAT, refresh_token: newRT } = resp.data.data
    console.log('Token 刷新成功', newAT, newRT)
    localStorage.setItem('cp-accessToken', newAT)
    return newAT
  } catch (e) {
    alert('当前未登录！')
    router.replace('/login')
    throw e
  }
}
export default service
