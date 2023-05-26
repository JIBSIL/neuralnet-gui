import { createRouter, createWebHistory } from 'vue-router';
import TrainModel from './components/TrainModel.vue';
import FAQ from './components/FAQ.vue';
import Homepage from './components/Homepage.vue';

const routes = [
  { path: '/', component: Homepage },
  { path: '/train', component: TrainModel },
  { path: '/faq', component: FAQ },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
