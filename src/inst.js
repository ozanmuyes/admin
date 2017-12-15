// This is where we define the new Vue instance (maybe from a modified, prototype binded, version of
// Vue). The reason is that these codes moved here from `main.js` is to be able to initiate Vue
// process while bootstrapping. This will gain us some performance.

import App from './App';

// Or this in `global`
// eslint-disable-next-line import/no-mutable-exports
let theInst = null;

// export setter fn
export function setter(Vue, rets) {
  // Or set in `global`
  theInst = new Vue({ // FIXME Inst is not a constructor
    el: '#app',
    store: rets.store,
    router: rets.router,
    i18n: rets.i18n,
    render: h => h(App),
  });
}

export default theInst;

// function parent() {
//   let theInst = null;
// debugger;
//   return function child(Inst = null, rets = {}) {
// debugger; // 'bootstrap/theApp' `call` or `apply`?
//     if (Inst !== null) {
//       console.log(`inst | Setting the instance as ${Inst}`);

//       theInst = new Inst({ // FIXME Inst is not a constructor
//         el: '#app',
//         store: rets.store,
//         router: rets.router,
//         render: h => h(App),
//       });
//     }

//     return theInst;
//   };
// }

// export default parent();

// // /* eslint-disable no-new */
// // const theInst = new Inst({
// //   el: '#app',
// //   store: rets.store,
// //   router: rets.router,
// //   render: h => h(App),
// // });

// // function initialize() {
// //   // It has already been initialized above. The global code will run
// //   // when this file is imported. So we only need to export this
// //   // function and need toreturn something meaningful from it.
// // }
