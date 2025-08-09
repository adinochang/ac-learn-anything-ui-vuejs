import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { useUserStore } from './stores/useUserStore';
import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (userStore.userId && to.path === '/') {
    next('/dashboard');
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});
if (import.meta.hot) {
  handleHotUpdate(router);
}
app.use(router);

app.mount('#app');
