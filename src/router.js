import { createRouter, createWebHistory } from 'vue-router';
import TrainModel from './components/TrainModel.vue';

const routes = [
  { path: '/', component: TrainModel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
