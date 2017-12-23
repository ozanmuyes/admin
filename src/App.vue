<template>
  <div id="app" :class="sizeClassForBreakpoint" ref="divApp">
    <responsive-detector @change="onResponsiveChange"></responsive-detector>
    <router-view v-if="isScreenBigEnough"></router-view>
    <div v-else>
      Screen is too small, can not show the administration panel application.
    </div>
  </div>
</template>

<script>
  import ResponsiveDetector from 'components/ResponsiveDetector';

  import { CHANGE_BREAKPOINT } from 'store/mutation-types';

  export default {
    name: 'app',
    components: {
      ResponsiveDetector,
    },
    data() {
      return {
        isScreenBigEnough: false,
        classForBreakpoint: '',
        //
      };
    },
    computed: {
      sizeClassForBreakpoint() {
        return `size-${this.classForBreakpoint}`;
      },
    },
    mounted() {
      console.log(`CMPNT#App | Mounted at ${(+new Date())}`);
      // console.log(`App component mounted in ${(+new Date()) - global.lastFinishTime} msecs.`);
      // global.lastFinishTime = (+new Date());
    },
    methods: {
      onResponsiveChange(classForBreakpoint) {
        this.isScreenBigEnough = (classForBreakpoint !== 'unsupported');

        // TODO Find out if class mutation is cumbersome - if so comment out the line below
        this.classForBreakpoint = classForBreakpoint;

        this.$store.commit(CHANGE_BREAKPOINT, { breakpoint: classForBreakpoint });
      },
    },
  };
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>

<!-- FIXME Where does these styles live? -->
<style>
  .el-form--inline .el-form-item__label {
    margin-right: 10px;
  }
  .el-form--inline .el-form-item__content {
    margin-right: 6px;
  }
</style>
