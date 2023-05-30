import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTelegram, faDiscord, faTwitter, faReddit } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import mitt from 'mitt';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const emitter = mitt();

library.add(faTelegram, faDiscord, faTwitter, faReddit)

const app = createApp(App)
app.use(router)

app.use(VueSweetalert2);
app.component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.emitter = emitter;

app.mount('#app');