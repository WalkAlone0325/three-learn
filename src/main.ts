import { createApp } from 'vue'
import App from './App.vue'
import autofit from 'autofit.js'
import 'animate.css'
import '@/assets/fonts/DincorosBlack/result.css'
import '@/assets/fonts/DouyuFont/result.css'
import '@/assets/fonts/SarasaMonoSC/result.css'
import '@/assets/fontawesome/css/all.css'

const app = createApp(App)
app.mount('#app')

// 自适应
autofit.init({
  el: '#app',
  dw: 1920,
  dh: 1080,
  resize: true,
})
