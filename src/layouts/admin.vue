<template>
  <div class="app-wrapper" :class="{hideSidebar}">
    <app-sidebar class="sidebar-container"></app-sidebar>

    <div class="main-container">
      <app-navbar></app-navbar>
      <!-- <app-taskbar></app-taskbar> -->
      <app-main :class="$style.mainContainer"></app-main>
    </div>
  </div>
</template>

<script>
  import AppNavbar from 'components/AppNavbar';
  import AppSidebar from 'components/AppSidebar';
  import AppMain from 'components/AppMain';
  // import AppTaskbar from 'components/AppTaskbar';

  export default {
    components: {
      AppNavbar,
      AppSidebar,
      AppMain,
      // AppTaskbar,
    },
    computed: {
      hideSidebar() {
        return !this.$store.state.app.hasSidebarOpened;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;

    position: relative;
    height: 100%;
    width: 100%;
  }
</style>

<style module>
  .mainContainer {
    padding: 20px;
  }
</style>
