import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/sass/main.sass'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// TODO: remove vuetify for good
// TODO: make first and last name required in welcome step onboarding
// TODO: make skip button work in onboarding steps
// TODO: quick overview of the whole project for refactoring/optimization
// TODO: do something after list has been added
// TODO: make list title required
// TODO: display lists
// TODO: edit lists after creation
// TODO: edit profile
