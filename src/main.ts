import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import autofit from 'autofit.js'

const app = createApp(App)
app.mount('#app')

// 自适应
autofit.init({
  el: '#app',
  dw: 1920,
  dh: 1080,
  resize: true,
})
