import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import registerIcons from './global/register-icon' // element-ui全局icon注册
import router from './router'
// import pinia from './store'
import store from './store'
// mockServer.js --- mock虚拟数据
import '@/mockjs/mockServe'
// 0.针对el-message按需引入
// import 'element-plus/theme-chalk/el-message.css'
// 1.所有组件样式全部引入，没必要
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(registerIcons)

// app.use(pinia)
// import useLoginStore from './store/login/login'
// const loginStore = useLoginStore()
// loginStore.loadLocalCacheAction()  为了代码优雅性，这一段移到了store/index.ts中
app.use(store)
app.use(router) // router放在pina加载之后
app.mount('#app')
