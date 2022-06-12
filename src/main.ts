import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import 'virtual:svg-icons-register'
import './assets/styles/common.scss'

const app = createApp(App)

app.mount('#app')
