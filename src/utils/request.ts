import axios from 'axios';
import router from '@/router';

const service = axios.create({
  baseURL: 'http://47.109.193.161:8543',  // ✔ 把 /api 放到这里
  timeout: 50000,
});
let isRefreshing = false;
let requestQueue:any = [];

service.interceptors.request.use(config => {
  // 先从 localStorage 取
  let accessToken = localStorage.getItem('cp-accessToken');
  let refreshToken = localStorage.getItem('cp-refreshToken');
  // 登录接口不加 token
  if (config?.url?.endsWith('/auth/login') && config.method === 'post') {
    return config;
  }
  // 刷新接口单独加刷新 Token
  if (config?.url?.includes('/auth/refresh')) {
    config.headers['Authorization'] = `Bearer ${refreshToken}`;
  } else {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, err => Promise.reject(err));


service.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const { config, response } = error;
    if (response && response.status === 401) {
      // 避免多次刷新
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAT = await doRefresh();
          // 执行队列
          requestQueue.forEach(cb => cb(newAT));
          requestQueue = [];
          // 重试本次失败请求
          config.headers['Authorization'] = `Bearer ${newAT}`;
          console.log('重试请求', config);
          return service.request(config);
        } catch (_) {
          // 刷新失败：清除登录态、跳转登录
          console.error('刷新 Token 失败');
          localStorage.removeItem('cp-accessToken');
          localStorage.setItem('cp-refreshToken', '');
          router.replace('/login');
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        // 刷新中，返回一个挂起的 Promise，等刷新完再重试
        return new Promise(resolve => {
          requestQueue.push(newAT => {
            config.headers['Authorization'] = `Bearer ${newAT}`;
            resolve(service.request(config));
          });
        });
      }
    }
    // 其他错误，直接抛
    return Promise.reject(error);
  }
);

async function doRefresh() {
  // 先从 localStorage 取
  let refreshToken = localStorage.getItem('cp-refreshToken');
  try {
    const resp = await axios.get('http://47.109.193.161:8543/api/auth/refresh',{
      params: {
        refreshToken,
      }
    });
    const { access_token: newAT, refresh_token: newRT } = resp.data.data;
    console.log('Token 刷新成功', newAT, newRT);
    localStorage.setItem('cp-accessToken', newAT);
    return newAT;
  } catch (e) {
    alert('Token 刷新失败，请重新登录');
    throw e;
  }
}
export default service;
// export { baseURL: service.defaults.baseURL };
