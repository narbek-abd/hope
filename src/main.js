import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import CSRFProvider from "@/providers/CSRFProvider.js"
import AuthProvider from "@/providers/AuthProvider.js"

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router)
});

app.use(pinia)

CSRFProvider();
AuthProvider();

app.use(router)
app.mount('#app')
