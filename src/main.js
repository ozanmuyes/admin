/* eslint-disable no-console, max-len */

import Vue from 'vue';

// Do NOT import bootstrappable things, e.g. store, router, bus etc.
import bootstrap from '@/bootstrap';

// eslint-disable-next-line
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

global.startTime = (+new Date());

// This is the first thin to do; calling bootstrap with Vue library
bootstrap(Vue)
  // // eslint-disable-next-line prefer-arrow-callback
  // .then(function bootstrapDone({ Inst, rets }) {
  //   // console.log(`Bootstrap completed succesfully at ${(+new Date())}`);
  //   global.lastFinishTime = (+new Date());
  //   console.log(`Bootstrap completed succesfully in ${global.lastFinishTime - global.startTime} msecs.`);

  //   // /* eslint-disable no-new */
  //   // new Inst({ // FIXME This ('Vue') MUST be the bootstrapped Vue instance, NOT the imported one
  //   //   el: '#app',
  //   //   store: rets.store,
  //   //   router: rets.router,
  //   //   render: h => h(App),
  //   // });
  // })
  // eslint-disable-next-line prefer-arrow-callback
  .then(function bootstrapDone() {
    // console.log(`Bootstrap completed succesfully at ${(+new Date())}`);
    global.lastFinishTime = (+new Date());
    console.log(`Bootstrap completed succesfully in ${global.lastFinishTime - global.startTime} msecs.`);
  })
  .catch((error) => { // eslint-disable-line no-unused-vars
    console.error('Error occured while bootstrap, ', error);
    // console.error('Error occured while bootstrap, ', JSON.parse(JSON.stringify(error)));
  });

// Project generic todos
// TODO App config Store has the config property to house the application settings. \
//      `store.state.app.config.showTaskbar.value` & `store.state.app.config.showTaskbar.type`

// TODO Translation
// TODO api and login procedures
