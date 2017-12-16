<template>
  <el-tabs
    :closable="isClosable"
    @tab-click="changeTab"
    @tab-remove="deleteTab"
    v-model="activeTabName"
  >
    <el-tab-pane
      v-for="(tab, index) in tabs"
      :key="tab.name"
      :label="tab.title"
      :name="tab.name"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
  import {
    // OPEN_IN_NEW_TAB,
    NAVIGATED,
    // CLOSE_TAB,
  } from 'event/types';

  export default {
    data() {
      return {
        activeTabName: '',
        tabs: [
          // { name: 'foo', title: 'Foo' },
        ],
        //
      };
    },
    computed: {
      isClosable() {
        return (this.tabs.length > 1);
      },
    },
    mounted() {
      // this.$bus.on(OPEN_IN_NEW_TAB, this.addTab);
      this.$bus.on(NAVIGATED, this.addTab);
    },
    beforeDestroy() {
      // this.$bus.off(OPEN_IN_NEW_TAB);
      this.$bus.off(NAVIGATED);
    },
    methods: {
      addTab(route) {
console.log('CMPNT#AppTaskbar | add tab', route);
        // NOTE `route` has `name`, `title`, ``... properties
        let name = '';
        if (route.name) {
          name = route.name;
        } else if (route.meta && route.meta.title) {
          name = route.meta.title;
        } else {
          name = 'NO NAME';
        }

        const title = (route.meta && route.meta.title)
          ? route.meta.title
          : 'NO TITLE';

        // TODO Check if the route wasn't opened before
        this.tabs.push({ name, title });

        if (route.meta && route.meta.noCache === false) {
          this.$store.state.cachedViews.push(name);
        }

        // TODO Activate the last added tab
        this.activeTabName = name;
      },
      changeTab(selectedTab) {
        if (selectedTab.name === this.$router.currentRoute.name) {
          return;
        }

console.log('CMPNT#AppTaskbar | change tab to', selectedTab);
        // We may access index, name and label (title),

        // FIXME This will trigger NAVIGATED again and adds another (identical) tab to the array
        this.$router.push({ name: selectedTab.name });
      },
      deleteTab(deletedTabName) {
        // NOTE `deletedTabName` has `name`, `title`, ``... properties

        const deletedTabIndex = this.tabs.findIndex(tab => (tab.name === deletedTabName));

        this.tabs.splice(deletedTabIndex, 1);

        // this.$bus.emit(CLOSE_TAB); // TODO Send deletedTabName if needed
      },
    },
    //
  };
</script>

<style>
  .el-tabs.el-tabs--top {
    background-color: #fbfbfb;
  }

  .el-tabs__header {
    margin-bottom: 0;
  }

  /* TODO THis might not be the right one */
  .el-tabs__nav-scroll {
    margin-left: 36px;
  }
</style>
