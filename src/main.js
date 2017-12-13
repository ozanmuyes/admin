/* eslint-disable no-unused-vars */

import Vue from 'vue';
// import ElementUI from 'element-ui';

import bootstrap from '@/bootstrap'; // [TSTBTSTRP]

// NOTE The order really matters, don't change
// import bus from 'event/bus';
// import store from 'store';
// import router from 'router';
// import './listeners'; // Register listeners
// import { initialize } from './listeners';

import App from './App';

// eslint-disable-next-line
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

// // TODO See http://element.eleme.io/#/en-US/component/quickstart#on-demand
// Vue.use(ElementUI);

// After we are done with the 'Vue'. We can add more arguments but the
// first argument MUST be imported Vue.
bootstrap(Vue).then(({ Inst, rets }) => {
// debugger;
console.log(Vue.prototype);
console.log(Inst.prototype);
  /* eslint-disable no-new */
  new Inst({ // FIXME This ('Vue') MUST be the bootstrapped Vue instance, NOT the imported one
    el: '#app',
    store: rets.store,
    router: rets.router,
    render: h => h(App),
  });
});
// initialize().then(() => {
//   // All the event listeners are initialized, now we can start the Vue

//   // bus.onReady(() => { // Also we can load the app after the bus has settled
//   // Inject global event bus
//   Vue.prototype.$bus = bus;

//   /* eslint-disable no-new */
//   new Vue({
//     el: '#app',
//     store,
//     router,
//     render: h => h(App),
//   });
//   // });
// });

// Project generic todos
// TODO App config Store has the config property to house the application settings. \
//      `store.state.app.config.showTaskbar.value` & `store.state.app.config.showTaskbar.type`
