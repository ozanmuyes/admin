<template>
  <scroll-pane class="tags-view-container">
    <router-link class="tags-view-item" :class="isActive(tag) ? 'active' : ''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
      {{ $t(`route.${tag.title}`) }}
      <span class="el-icon-close" @click.prevent="closeViewTags(tag)"></span>
    </router-link>
  </scroll-pane>
</template>

<script>
  import ScrollPane from 'components/ScrollPane';

  export default {
    components: {
      ScrollPane,
    },
    computed: {
      visitedViews() {
        return this.$store.state.app.visitedViews;
      },
    },
    methods: {
      closeViewTags(view) {
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0];

            this.$router.push(latestView ? latestView.path : '/');
          }
        });
      },
      generateRoute() {
        return this.$route.name
          ? this.$route
          : false;
      },
      addViewTags() {
        const route = this.generateRoute();
debugger;
        if (!route) {
          return;
        }

        this.$store.dispatch('addVisitedViews', route);
      },
      isActive(route) {
        return ((route.path === this.$route.path) || (route.name === this.$route.name));
      },
    },
    watch: {
      $route() {
        this.addViewTags();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tags-view-container {
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .tags-view-container {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
