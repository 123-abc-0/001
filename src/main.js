import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from "./router"
import elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import elementIcons from "./plugins/icons"
createApp(App).use(router).use(elementplus).use(elementIcons).mount('#app')

// createApp(App).mount('#app')
