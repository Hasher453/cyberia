import './assets/main.styl'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
