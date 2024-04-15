import './assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'

import Vue3TouchEvents from 'vue3-touch-events'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(Vue3TouchEvents)
app.use(createPinia())
app.use(router)

app.mount('#app')
