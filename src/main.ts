import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';

if ("paintWorklet" in CSS) {
    CSS.paintWorklet.addModule('/smoothCorners.js');
}

createApp(App)
    .use(router)
    .mount('#app');
