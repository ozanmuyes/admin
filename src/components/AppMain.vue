<template>
  <main class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </main>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.app.cachedViews; // TODO Add state
      },
      // key() {
      //   return this.$route.name !== undefined
      //     ? this.$route.name + +new Date()
      //     : this.$route + +new Date();
      // },
    },
  };
</script>

<style>
  #app-main {
    min-height: 100%;
  }
</style>
