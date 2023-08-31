import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import VueDOMPurifyHTML from 'vue-dompurify-html'

createApp(App).use(router).use(Quasar, quasarUserOptions).use(VueDOMPurifyHTML).mount('#app')
