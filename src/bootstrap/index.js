/* eslint-disable no-unused-vars */

const reqCtx = require.context('./', false, /^(?!.*index).*\.js$/);

// TODO Sort reqs by their 'priority'ies
const keys = reqCtx.keys();
const reqs = [];
console.log('BTSTR#index | keys = ', keys);

function start(Vue, ...params) {
console.log('BTSTR#index.start | params = ', params);

  // TODO Maybe `reject` where error occures.
  return new Promise((resolve) => {
    let currReq = null;
    keys.forEach((key) => {
      if (!key.startsWith('./_')) { // FIXME The parameter of starts with is so fragile
        currReq = reqCtx(key);

        if (!(
          (typeof currReq === 'object' && typeof currReq.default === 'undefined') ||
          (typeof currReq === 'function' && typeof currReq.name === 'undefined')
        )) {
          reqs.push(currReq);
        }
      }
    });

    // TODO Do sorting here
    let sortedReqs = null;
    if (reqs.length > 1) {
      sortedReqs = [...reqs];

      sortedReqs.sort((lhs, rhs) => {
        const lhsPriority = (lhs.priority || 0);
        const rhsPriority = (rhs.priority || 0);

        if (lhsPriority > rhsPriority) {
          return 1; // no change
        } else if (lhsPriority === rhsPriority) {
          return 0;
        }
        return -1;
      });
    } else {
      sortedReqs = reqs;
    }

    const fns = []; // Last element MUST be `null` - see below

    sortedReqs.forEach(async (req) => {
      let fn = null;
      let nm = null;

      if (typeof req === 'function') {
        fn = req;
        nm = (req.name || 'N/A');
      } else {
        if (req.default) { // eslint-disable-line no-lonely-if
          fn = req.default;
        } else if (typeof req.initialize === 'function') {
          fn = req.initialize;
        } else {
          throw new Error('Unknown bootstrapp function');
        }

        nm = (req.name || 'NAN');
      }

      // TODO Ensure if the `fn` is a function

// console.log(`BTSTR#index.start | Initializing ${nm}...`);
//       // Hopefully sync code below
//       await fn.apply(Vue, params); // NOTE Maybe `call` with parameter(s) (e.g. Vue)
// console.log(`BTSTR#index.start | ${nm} initialized.`);
      fns.push({ name: nm, fn });
    });
    // TODO Iterate the codes below;
    //     let fn = (currReq.initialize || currReq);
    //     let nm = (currReq.name || 'N/A');

    //     if (typeof currReq === 'function') {
    //       fn = currReq;
    //       nm = (currReq.name || 'N/A');
    //     } else {
    //       if (currReq.default) {
    //         fn = currReq.default;
    //       } else if (typeof currReq.initialize === 'function') {
    //         fn = currReq.initialize;
    //       }
    //       // TODO Else what???

    //       nm = (currReq.name || 'NAN');
    //     }

    //     // TODO Ensure if the `fn` is a function

    // console.log(`BTSTR#index | Initializing ${nm}...`);
    //     // Hopefully sync code below
    //     fn.apply(this, params); // NOTE Maybe `call` with parameter(s) (e.g. Vue)
    // console.log(`BTSTR#index | ${nm} initialized.`);

    fns.push({ fn: null });

    let i = -1;
    let ret = null;
    const rets = {};
    let currFn = null;
    const iterator = () => {
      i += 1;

      currFn = fns[i].fn;

      if (currFn === null) {
// debugger;
        return resolve({ Inst: Vue, rets });
      }

console.log(`BTSTR#index | Calling ${fns[i].name}...`);
      ret = currFn.apply(Vue, params);
console.log(`BTSTR#index | Finished ${fns[i].name}`);
// debugger;
      if (ret === null) {
        iterator(); // continue
      } else if (typeof ret === 'function') {
        const rslvd = ret();
        if (rslvd.then) {
          rslvd.then((rslvdRet) => {
            if (rslvdRet !== null && typeof rslvdRet !== 'undefined') {
              rets[fns[i].name] = rslvdRet;
            }
            iterator(); // continue
          });
        } else {
          rets[fns[i].name] = rslvd;
          iterator(); // continue
        }
      } else if (ret.then) {
        ret.then((rslvd) => {
          rets[fns[i].name] = rslvd;
          iterator(); // continue
        });
      } else {
        rets[fns[i].name] = ret;
        iterator(); // continue
      }

      return null; // TODO Check if its OK
    };
    iterator();
  });
}

export default start;
