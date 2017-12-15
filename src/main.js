/* eslint-disable no-console, max-len */

import Vue from 'vue';

// Do NOT import bootstrappable things, e.g. store, router, bus etc.
import bootstrap from '@/bootstrap';

// eslint-disable-next-line
import 'element-ui/lib/theme-chalk/index.css';

// FIXME Why this is here? Why not in the bootstrap file?
Vue.config.productionTip = false;

console.log(`Loading started at ${(+new Date())}`);
// global.startTime = (+new Date());

// This is the first thin to do; calling bootstrap with Vue library. And in
// the bootstrap phase we will mutate it (i.e. call its `use()` function,
// add objects to its `prototype`)
bootstrap(Vue)
  // eslint-disable-next-line prefer-arrow-callback
  .then(function bootstrapDone() {
    console.log(`Bootstrap completed succesfully at ${(+new Date())}`);
    // global.lastFinishTime = (+new Date());
    // console.log(`Bootstrap completed succesfully in ${global.lastFinishTime - global.startTime} msecs.`);
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
