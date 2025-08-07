import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const router = createRouter({
  history: createWebHistory(),
  routes,
});
if (import.meta.hot) {
  handleHotUpdate(router);
}
app.use(router);

app.mount('#app');
