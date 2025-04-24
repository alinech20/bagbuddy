import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '@/plugins/vuetify.ts'
import '@/styles/main.sass'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')

// TODO: quick overview of the whole project for refactoring/optimization
// TODO: do something after list has been added
// TODO: make list title required (check on save and go to first step if not filled)
