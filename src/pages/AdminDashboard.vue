<template>
  <div class="app-wrapper" :class="{hideSidebar: !sidebar.hasSidebarOpened}">
    <app-sidebar class="sidebar-container"></app-sidebar>

    <div class="main-container">
      <span>admin dashboard</span>
      <!-- TODO <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
  import AppSidebar from 'components/AppSidebar';

  export default {
    components: {
      AppSidebar,
    },
    computed: {
      sidebar() {
        return this.$store.state.app;
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
