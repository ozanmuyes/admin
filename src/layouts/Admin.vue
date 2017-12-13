<template>
  <div class="app-wrapper" :class="{hideSidebar}">
    <app-sidebar class="sidebar-container"></app-sidebar>

    <div class="main-container">
      <app-navbar></app-navbar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import AppNavbar from 'components/AppNavbar';
  import AppSidebar from 'components/AppSidebar';
  import AppMain from 'components/AppMain';
  import TagsView from 'components/TagsView'; // TODO Rename it as AppTaskbar

  export default {
    components: {
      AppNavbar,
      AppSidebar,
      AppMain,
      TagsView,
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
