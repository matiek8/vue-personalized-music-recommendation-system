import './assets/main.scss'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createApp }             from 'vue'
import { createPinia }           from 'pinia'
import { Chart, registerables }  from 'chart.js'

import App from './App.vue'
import router from './router'

Chart.register(...registerables)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router)

app.mount('#app')
