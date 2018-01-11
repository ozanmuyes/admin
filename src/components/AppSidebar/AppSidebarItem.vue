<template>
  <div>
    <div v-if="isLoading" class="loading"></div>
    <div v-else class="menu-wrapper">
      <template v-for="item in routes">
        <!-- <router-link v-if="item.children && item.children.length === 1"
          :key="item.children[0].name"
          :to="item.path+'/'+item.children[0].path"
        >
          X
          <el-menu-item class='submenu-title-noDropdown' :index="item.path+'/'+item.children[0].path">
            <svg-icon v-if="item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>
            <span v-if="item.children[0].title">{{ generateTitle(item.children[0].title) }}</span>
          </el-menu-item>
        </router-link> -->

        <el-submenu v-if="item.children && item.children.length > 0"
          :index="item.name || item.path"
          :key="item.name"
        >
          <template slot="title">
            <!-- Y -->
            <!-- <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta.title">{{ generateTitle(item.meta.title, true) }}</span>
          </template>

          <template v-for="child in item.children">
            <app-sidebar-item v-if="child.children && child.children.length > 0"
              class="nest-menu"
              :key="child.path"
              :routes="[child]"
            ></app-sidebar-item>

            <el-menu-item v-else :index="`${item.path}/${child.path}`">
              <router-link
                :key="child.name"
                :to="normalizePath(item.path, child.path)"
              >
                <!-- ZZ -->
                <!-- <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon> -->
                <i v-if="child.icon" :class="child.icon"></i>
                <span v-if="child.meta.title">{{ generateTitle(`${item.meta.title}.${child.meta.title}`) }}</span>
              </router-link>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else
          class='submenu-title-noDropdown'
          :index="item.path"
        >
          <router-link
            :key="item.name"
            :to="item.path"
          >
            <!-- X -->
            <!-- <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta.title">{{ generateTitle(item.meta.title) }}</span>
            <h1 v-if="!item.meta.icon && !item.meta.title">
              {{ item.path }} WARN: No `icon` or `title`
            </h1>
          </router-link>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>

<script>
  import SvgIcon from 'components/SvgIcon';

  // import { routesForSidebar } from 'router/for';

  export default {
    name: 'AppSidebarItem',
    components: {
      SvgIcon,
    },
    props: {
      routes: {
        type: [Array],
      },
    },
    computed: {
      isLoading() {
        return (this.routes.length === 0);
      },
    },
    methods: {
      generateTitle(title, isAlsoItsRoot = false) {
        // return title; // bypass l10n for now

        // TODO If title has '*' for a path (e.g. 'foo.*.bar') search in children
        return this.$t(`router.${title}${isAlsoItsRoot ? '._' : ''}`);
      },
      normalizePath(itemPath, childPath) {
        if (
          childPath.startsWith('http://') ||
          childPath.startsWith('https://') ||
          childPath.startsWith('//')
          // TODO Add more if necessary - e.g. './' or '../' (starting with '.')
        ) {
          return childPath;
        }

        return `${itemPath}/${childPath}`;
      },
    },
  };
</script>

<!-- TODO Loading state styles -->
