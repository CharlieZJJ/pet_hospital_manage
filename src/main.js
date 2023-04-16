import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import VideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

const app = createApp(App)

// 注册 Element Plus 组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 添加全局异常处理
app.config.errorHandler = (err, vm, info) => {
    console.log(`Error: ${err.toString()}\nInfo: ${info}`)
}

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VideoPlayer)
app.mount('#app')
