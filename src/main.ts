import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App) //.use(store).use(router).mount('#app')

app.use(store)
app.use(router)

/*if (process.env.NODE_ENV === 'development') {
    if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
    }
}*/

app.mount('#app')