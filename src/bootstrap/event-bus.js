/* eslint-disable */

// TODO Make this a class that extends from './_base.js'

// import base

// class EventBusBootstrap { // extends Base
//   constructor() {
//     // TODO Also call parent's ctor if necessary and not done automatically
//   }
// }

// --------------------------------------------------------------------------------

import bus from 'event/bus';

export const name = 'EventBus';
export const priority = -5169;

function initialize(...params) {
  // `this` is the Vue library - we can call `use` on it
console.log(`BTSTR#event-bus | Initializing ${name} with`, params);

  // const bus = initializeBus();

  // TODO Test if `$bus` will work on a component w/o this
  // Inject global event bus
  this.prototype.$bus = bus;

  return bus;
}

export default initialize;

// --------------------------------------------------------------------------------

// export default {
//   name: 'EventBus',
//   priority: -5169,
//   initialize() {
// console.log(`BTSTR#${this.name} | Initializing...`);
// console.log(`BTSTR#${this.name} | Initialized.`);
//   },
// };
