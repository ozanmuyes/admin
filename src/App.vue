<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // import {
  //   LOCAL_STATE_LOADED,
  //   // ROUTES_LOADED,
  // } from 'event/types';

  export default {
    name: 'app',
    created() {
console.log('CMPNT#App | created');
    },
    mounted() {
console.log('CMPNT#App | mounted');
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
