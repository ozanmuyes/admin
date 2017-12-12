import Vue from 'vue';

// NOTE The order really matters, don't change
import bus from 'event/bus';
import store from 'store';
import router from 'router';
import './listeners'; // Register listeners

import App from './App';

Vue.config.productionTip = false;

// Inject global event bus
Vue.prototype.$bus = bus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
