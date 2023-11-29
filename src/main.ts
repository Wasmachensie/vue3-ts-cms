import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import registerIcons from './global/register-icon' // element-ui全局icon注册
import router from './router'
import pinia from './store'
// mockServer.js --- mock虚拟数据
import '@/mockjs/mockServe'
// 0.针对el-message按需引入
// import 'element-plus/theme-chalk/el-message.css'
// 1.所有组件样式全部引入，没必要
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
app.use(registerIcons)
