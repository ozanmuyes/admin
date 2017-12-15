/* eslint-disable no-param-reassign */

import { setter } from '@/inst';

export const name = 'Vue';
export const priority = 1000;

function initialize({ Vue, rets }) {
  // TODO Add necessary things to the Vue here

  // Here we have to set the global Vue instance, using its 'setter'.
  // From now on every `import` of the '/src/inst.js' SHOULD return
  // 'the instance' (`theInst` in the file).
  // TODO Check if `theInst` of '/src/inst.js' exports proper value after set and import.
  setter.call(null, Vue, rets);
}

export default initialize;
