import Vue from 'vue';
import Vuex from 'vuex';

import bus from 'event/bus';
import { LOCAL_STATE_LOADED } from 'event/types';
import createLocalState from '@/plugins/localState';
import initialState from './state';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: initialState,
  mutations,
  //
  plugins: [
    createLocalState({
      // paths: [
      //   'user',
      // ],
      callback: () => {
        // setTimeout is crucial for waiting the system to stabilize
        setTimeout(() => {
          bus.$emit(LOCAL_STATE_LOADED);
        }, 10);
      },
    }),
  ],
});
