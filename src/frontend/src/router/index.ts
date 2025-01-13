import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/index.vue';
import FolderView from '../pages/FolderView/index.vue';
import NotFound from '../pages/NotFound/index.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/folder', component: FolderView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
