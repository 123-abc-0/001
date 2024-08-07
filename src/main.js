import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import store from './store/counter'
// import Vuex from 'vuex'
import router from "./router"
import elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import elementIcons from "./plugins/icons"


import { createPinia } from 'pinia'



const app = createApp(App)
.use(router).use(elementplus).use(elementIcons).mount('#app')


// const pinia = createPinia()
// app.use(pinia)
// app.use(createPinia)
 
// app.mount('#app')



// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// Vuex.use(Vuex)
// createApp(App).mount('#app')
