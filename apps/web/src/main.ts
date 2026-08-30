import { createApp } from 'vue'
import App from '@/app/App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './app/router'
import { queryClient } from './app/providers/query-client'

const app = createApp(App)

app.use(router)

app.use(VueQueryPlugin, {
  queryClient,
})


app.mount('#app')
