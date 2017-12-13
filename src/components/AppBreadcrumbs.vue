<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in items" :key="item.path">
      <span v-if="typeof item.path === 'undefined' || item.path === ''" class="no-redirect">
        {{ generateTitle(item.meta.title) }}
      </span>
      <router-link v-else :to="item.path">
        {{ generateTitle(item.meta.title) }}
      </router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { UPDATE_BREADCRUMBS } from 'event/types';

  export default {
    data() {
      return {
        items: [],
      };
    },
    mounted() {
console.log('CMPNT#AppBreadcrumb | UPDATE_BREADCRUMBS event is listening...');
      this.$bus.$on(UPDATE_BREADCRUMBS, (breadcrumbs) => {
console.log('CMPNT#AppBreadcrumb | update breadcrumbs as = ', breadcrumbs);

        this.items = breadcrumbs;
      });
    },
    beforeDestroy() {
console.log('CMPNT#AppBreadcrumb | UPDATE_BREADCRUMBS event is not listened anymore.');
      this.$bus.$off(UPDATE_BREADCRUMBS);
    },
    methods: {
      generateTitle(title) {
        return title; // bypass l10n for now

        // FIXME remove 'admin' from title - it comes from 'vue-router'
        // return this.$t(`route.${title}`);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
