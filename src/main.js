import 'mana-font/css/mana.min.css';
import Vue from 'vue';
import App from './App.vue';
import store from "./store";
import router from "./router";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
