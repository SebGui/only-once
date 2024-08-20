import { createApp } from 'vue'

// FormKit
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

// Pinia
import { createPinia } from 'pinia'

// Vuecookies
import VueCookies from 'vue-cookies'

// OnlyOnce config
import config from '@/../onceConfig'

import App from './App.vue'
import router from './router'

import '@/assets/global.css'

createApp(App)
.use(router)
.use(createPinia())
.use(plugin, defaultConfig)
.use(VueCookies, {expires: config.accessTokenExpires})
.mount('#app')
