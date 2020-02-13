import Vue from 'vue';
import Router from 'vue-router';

import About from '../About.vue';
import Calculator from '../Calculator.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Calculator},
    {path: '/about', component: About},
  ]
});
