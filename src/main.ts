import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './style.css'
import BaseButton from './components/UI/BaseButton.vue'
import BaseCircleButton from './components/UI/BaseCircleButton.vue'
import BaseDialog from './components/UI/BaseDialog.vue'

const pinia = createPinia()
const app = createApp(App)

app.component('BaseButton', BaseButton)
app.component('BaseCircleButton', BaseCircleButton)
app.component('BaseDialog', BaseDialog)

app.use(pinia)
app.mount('#app')
