import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'

import router from './router'

import './assets/main.css'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)

app.use(router)

const pinia = createPinia();

app.use(pinia)

pinia.use(piniaPluginPersistedstate)


app.mount('#app')
