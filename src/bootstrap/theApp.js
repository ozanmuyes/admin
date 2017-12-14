import { setter } from '@/inst';

export const name = 'Vue';
export const priority = 800;

function initialize({ Vue, rets }) {
  // Here we have to set the global Vue instance, using its 'setter'.
  // From now on every `import` of the '/src/inst.js' SHOULD return
  // 'the instance' (`theInst` in the file).
  // TODO Check if `theInst` of '/src/inst.js' exports proper value after set and import.
  setter.call(null, Vue, rets);
}

export default initialize;
