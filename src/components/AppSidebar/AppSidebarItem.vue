<template>
  <div class="menu-wrapper">
    <template v-for="item in elRoutes">
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

      <el-submenu v-if="item.children && item.children.length > 1"
        :index="item.name || item.path"
        :key="item.name"
      >
        <template slot="title">
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.title">{{ generateTitle(item.title) }}</span>
        </template>

        <template v-for="child in item.children">
          <app-sidebar-item v-if="child.children && child.children.length > 0"
            class="nest-menu"
            :key="child.path"
            :routes="[child]"
          ></app-sidebar-item>

          <el-menu-item v-else :index="item.path+'/'+child.path">
            <router-link
              :key="child.name"
              :to="item.path+'/'+child.path"
            >
              <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child.title">{{ generateTitle(child.title) }}</span>
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
          <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item.title">{{ generateTitle(item.title) }}</span>
          <h1 v-if="!item.icon && !item.title">
            {{ item.path }} WARN: No `icon` or `title`
          </h1>
        </router-link>
      </el-menu-item>
    </template>
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
        type: [Object, Array],
      },
    },
    computed: {
      elRoutes() {
// debugger;
        return this.routes;
      },
//         const isFilterObj = (typeof this.routes === 'object' && !Array.isArray(this.routes));
// debugger;
//         if (isFilterObj === true) {
//           // return param.items;
//           if (this.routes.filters) {
//           // if (this.filters.includes('sidebar')) {
//             return this.routes.items;
//           }
//         } /* else if (param.isArray) { */
//           return routesForSidebar(this.routes);
//         // } else {
//           // `param.isFilterObj === false` ???
//         // }
//       },
    },
    methods: {
      generateTitle(title) {
        // TODO If title has '*' for a path (e.g. 'foo.*.bar') search in children
        return this.$t(`route.${title}`);
      },
    },
  };
</script>
