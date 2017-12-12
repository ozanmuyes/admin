<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      unique-opened
      :default-active="$route.path"
      :collapse="isCollapsed"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <app-sidebar-item :routes="routes"></app-sidebar-item>
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
      isCollapsed() {
        return !this.$store.state.app.hasSidebarOpened;
      },
    },
  };
</script>

<style>
  a {
    color: white;
  }
</style>
