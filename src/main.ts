import { createApp } from 'vue'
import { createPinia } from 'pinia'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 如果只想导入css变量
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入进度条样式
import 'nprogress/nprogress.css'
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.use(router)

app.mount('#app')
