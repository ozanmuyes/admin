import bus from 'event/bus';

// Get all the js files except 'index.js'
const req = require.context('./', false, /^(?!.*index).*\.js$/);

let currReq = null;

// eslint-disable-next-line wrap-iife
(function initialize() {
  req.keys().forEach((key) => {
    currReq = req(key);
    if (currReq.default) {
      // NOTE Default export of a listener MUST be the inizitialize method
      currReq.default.call(currReq, bus);
    } else if (typeof currReq.initialize === 'function') {
      // Alternatively a listener may export its `initialize` method by name
      currReq.initialize.call(currReq, bus);
    }
  });
})();
