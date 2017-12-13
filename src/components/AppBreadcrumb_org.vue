<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if="typeof item.name === 'undefined' && (item.redirect==='noredirect' || index == levelList.length - 1)" class="no-redirect">
        <!-- <span v-if='item.redirect==="noredirect" || index == levelList.length - 1' class="no-redirect"> -->
          {{ generateTitle(item.meta.title) }}
        </span>
        <router-link v-else
          :to="item.redirect || item.path"
        >
          {{ generateTitle(item.meta.title) }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import { UPDATE_BREADCRUMBS } from 'event/types';

  export default {
//     created() {
// // debugger;
//       this.getBreadcrumb();
//     },
    props: {
      dashboardPath: {
        type: String,
        required: true,
      },
      dashboardTitle: {
        type: String,
        default: 'dashboard',
      },
    },
    data() {
      return {
        levelList: null,
      };
    },
    // watch: {
    //   $route() {
    //     this.getBreadcrumb();
    //   },
    // },
    mounted() {
console.log('CMPNT#AppBreadcrumb | UPDATE_BREADCRUMBS event is listening...');
      this.$bus.$on(UPDATE_BREADCRUMBS, (breadcrumbs) => {
        // TODO Probably set `data` and let the Vue shine with its reactivity
console.log('CMPNT#AppBreadcrumb | update breadcrumbs as = ', breadcrumbs);

        this.levelList = breadcrumbs;
      });
    },
    beforeDestroy() {
console.log('CMPNT#AppBreadcrumb | UPDATE_BREADCRUMBS event is not listened anymore.');
      this.$bus.$off(UPDATE_BREADCRUMBS);
    },
    methods: {
      /* eslint-disable max-len */
//       getBreadcrumb() {
//         /* eslint-disable max-len, no-continue */

// console.log('CMPNT@AppBreadcrumb | this.$route = ', this.$route);

//         let matched = this.$route.matched.filter(record => ((record.path !== '' /* && typeof record.name !== 'undefined' */) && (record.meta && (record.meta.name !== 'dashboard' || record.meta.title !== 'dashboard'))));
//         // let matched = this.$route.matched.filter(record => (record.meta && (record.meta.name !== 'dashboard' || record.meta.title !== 'dashboard')));
//         // // let matched = this.$route.matched;
//         // // // let matched = this.$route.matched.filter(item => item.name);
//         const first = matched[0];
// console.log('CMPNT@AppBreadcrumb | matched = ', matched);
// console.log(`CMPNT@AppBreadcrumb | first.name = ${first.name}`);
//         if (first && first.meta && first.meta.name !== 'dashboard') {
//           matched = [{
//             path: this.dashboardPath,
//             meta: {
//               title: this.dashboardTitle,
//               from: 'CMPNT#AppBreadcrumb',
//             },
//           }].concat(matched);
//           // matched = [{ path: this.dashboardPath, meta: { title: this.dashboardTitle } }]
//           //   .concat(matched);
//           // // matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched);
//         }

// //         // FIXME Move this logic somewhere else
// //         const processed = [];
// //         const matchedLength = matched.length;
// //         let currRecord = null;
// //         let nextRecord = null;
// //         for (let i = 0; i < matchedLength; i += 1, currRecord = null, nextRecord = null) {
// // // debugger;
// //           currRecord = matched[i];

// //           // [BKBDRKKK]
// //           if (currRecord.path === nextRecord.path) {
// //             continue;
// //           }

// //           if (currRecord.meta && currRecord.meta.from === 'CMPNT#AppBreadcrumb') {
// //             processed.push(currRecord);
// //             continue;
// //           }

// //           // i += 1; // [ZBRVSKY]
// //           // if (i < matchedLength) {
// //           if (i + 1 < matchedLength) {
// //             // If there is at least one more next record exists
// // // debugger;
// //             // nextRecord = matched[i + 1]; // [ZBRVSKY]
// //             i += 1;
// //             nextRecord = matched[i];

// //             // // Map
// //             // if (currRecord.path.indexOf(':') > -1) {
// //             //   currRecord.path = '';
// //             // }

// //             // The Check
// //             if (typeof currRecord.name === 'undefined' && nextRecord.path === '') {
// //               currRecord.path = '';
// //               // continue;
// //             }
// //             // [BKBDRKKK]
// //             // if (currRecord.path === nextRecord.path) {
// //             //   continue;
// //             // }

// //           // } else {
// //           //   // TODO Decide if we need to process the last record, if so do NOT `break`
// //           //   // FIXME If we do break here the last record is not going to be shown - SKIP THE CHECK
// //           //   break;
// //           }

// //           // TODO Check the condition which couldn't be expressed in the filter for `matched`

// //           processed.push(currRecord);
// //         }
// //
// //        this.levelList = processed;
//        this.levelList = matched;
// console.log('CMPNT@AppBreadcrumb | levelList = ', this.levelList);
//         /* eslint-enable max-len, no-continue */
//       },
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
