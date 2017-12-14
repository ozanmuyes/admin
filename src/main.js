/* eslint-disable no-console */

import Vue from 'vue';

// Do NOT import bootstrappable things, e.g. store, router, bus etc.

import bootstrap from '@/bootstrap'; // [TSTBTSTRP]

import App from './App';

// eslint-disable-next-line
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

global.startTime = (+new Date());

// This is the first thin to do; calling bootstrap with Vue library
// eslint-disable-next-line prefer-arrow-callback
bootstrap(Vue).then(function bootstrapDone({ Inst, rets }) {
  // console.log(`Bootstrap completed succesfully at ${(+new Date())}`);
  global.lastFinishTime = (+new Date());
  console.log(`Bootstrap completed succesfully in ${global.lastFinishTime - global.startTime} msecs.`);

  /* eslint-disable no-new */
  new Inst({ // FIXME This ('Vue') MUST be the bootstrapped Vue instance, NOT the imported one
    el: '#app',
    store: rets.store,
    router: rets.router,
    render: h => h(App),
  });
}).catch((error) => { // eslint-disable-line no-unused-vars
  console.error('Error occured while bootstrap, ', error);
  // console.error('Error occured while bootstrap, ', JSON.parse(JSON.stringify(error)));
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

// TODO Translation
// TODO api and login procedures
