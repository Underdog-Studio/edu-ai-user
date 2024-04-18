import { createApp } from 'vue'
import AppRoot from './AppRoot.vue'

import router from './router'
import pinia from './pinia'

import './permission'

import 'virtual:uno.css'  // unocss

createApp(AppRoot)
    .use(router)
    .use(pinia)
    .mount('#app')
