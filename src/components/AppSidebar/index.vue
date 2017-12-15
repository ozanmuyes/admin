<template>
  <scroll-bar>
    <el-menu
      :mode="menuMode"
      unique-opened
      :default-active="$route.path"
      :collapse="isCollapsed"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <div v-if="loading">loading...</div>
      <app-sidebar-item v-else :routes="routes"></app-sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import ScrollBar from 'components/ScrollBar';
  import AppSidebarItem from './AppSidebarItem';

  export default {
    components: {
      ScrollBar,
      AppSidebarItem,
    },
    computed: {
      routes() {
        return this.$store.state.app.sidebarRoutes;
      },
      loading() {
        return (this.routes === null || this.routes.length < 1);
      },
      isCollapsed() {
        return !this.$store.state.app.hasSidebarOpened;
      },
      menuMode() {
        if (this.$store.state.app.breakpoint === 'mobile') {
          return 'horizontal';
        }

        return 'vertical';
      },
    },
  };
</script>

<style scoped>
  a {
    color: white;
  }
</style>
