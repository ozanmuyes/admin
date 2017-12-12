<template>
  <div class="app-wrapper" :class="{hideSidebar: !sidebar.opened}">
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
  import TagsView from 'components/TagsView';

  export default {
    components: {
      AppNavbar,
      AppSidebar,
      AppMain,
      TagsView,
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
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
