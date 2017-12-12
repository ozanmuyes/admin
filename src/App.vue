<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" @click.prevent="decrement"> -->
    <!-- {{ counter }} -->
    <router-view/>
  </div>
</template>

<script>
  import {
    LOCAL_STATE_LOADED,
    ROUTES_LOADED,
  } from 'event/types';

  export default {
    name: 'app',
    // computed: {
    //   counter() {
    //     return this.$store.state.counter;
    //   },
    // },
    mounted() {
      this.$bus.$on(LOCAL_STATE_LOADED, () => {
        console.log('LOCAL_STATE_LOADED from App.vue');
      });

      this.$bus.$on(ROUTES_LOADED, (routes) => {
        console.log('routes', routes);
      });
    },
    beforeDestroy() {
      this.$bus.$off(LOCAL_STATE_LOADED);
      this.$bus.$off(ROUTES_LOADED);
    },
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
