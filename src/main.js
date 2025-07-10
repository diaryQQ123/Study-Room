import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from "./store/index"
import echarts from 'echarts'
import VueECharts from 'vue-echarts' 
import App from './App.vue'

const app=createApp(App)
app.use(router)
app.component('v-chart',VueECharts)
app.config.globalProperties.$echarts=echarts
app.use(store)
app.use(ElementPlus)
app.mount('#app')
