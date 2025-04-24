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

// TODO: Add loaders for all requests
// TODO: Display error messages in the UI
// TODO: Skip list creation step if no data (e.g. no subcategories)
// TODO: Keep list of packing lists for the current user
// TODO: when creating list, add it to the list of lists
// TODO: quick overview of the whole project for refactoring/optimization
// TODO: do something after list has been added
