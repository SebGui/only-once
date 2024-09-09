import { createApp } from 'vue'
import keys from '@/../keys'

// FormKit
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

import { createProPlugin, inputs } from '@formkit/pro'
//import { rootClasses } from '../formkit.theme'//'@formkit/themes'
const pro = createProPlugin(keys.formkit.key, inputs)

// Pinia
import { createPinia } from 'pinia'

// Vuecookies
import VueCookies from 'vue-cookies'

// OnlyOnce config
import config from '@/../onceConfig'

// Spinners
import { VueSpinnersPlugin } from 'vue3-spinners';

import App from './App.vue'
import router from './router'

import '@/assets/global.css'

createApp(App)
.use(router)
.use(createPinia())
.use(VueSpinnersPlugin)
.use(plugin, defaultConfig(
    { 
        plugins: [pro],
        //config: { rootClasses } 
      }
))
.use(VueCookies, {expires: config.accessTokenExpires})
.mount('#app')
