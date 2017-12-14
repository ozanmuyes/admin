<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  // import {
  //   LOCAL_STATE_LOADED,
  //   // ROUTES_LOADED,
  // } from 'event/types';

  export default {
    name: 'app',
    mounted() {
      // console.log(`App component mounted at ${(+new Date())}`);
      console.log(`App component mounted in ${(+new Date()) - global.lastFinishTime} msecs.`);
      global.lastFinishTime = (+new Date());
    },
    // computed: {
    //   counter() {
    //     return this.$store.state.counter;
    //   },
    // },
    // mounted() {
    //   this.$bus.$on(LOCAL_STATE_LOADED, () => {
    //     console.log('LOCAL_STATE_LOADED from App.vue');
    //   });

    //   // this.$bus.$on(ROUTES_LOADED, (routes) => {
    //   //   console.log('routes', routes);
    //   // });
    // },
    // beforeDestroy() {
    //   this.$bus.$off(LOCAL_STATE_LOADED);
    //   // this.$bus.$off(ROUTES_LOADED);
    // },
  };
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>
