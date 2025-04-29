import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// 全局组件

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('LoadingSpinner', LoadingSpinner)
app.use(pinia)
app.use(router)
app.mount('#app')
