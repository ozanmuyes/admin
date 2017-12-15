<template>
  <div id="app" :class="sizeClassForBreakpoint" ref="divApp">
    <responsive-detector @change="onResponsiveChange"></responsive-detector>
    <router-view></router-view>
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
      console.log(`App component mounted at ${(+new Date())}`);
      // console.log(`App component mounted in ${(+new Date()) - global.lastFinishTime} msecs.`);
      // global.lastFinishTime = (+new Date());
    },
    methods: {
      onResponsiveChange(classForBreakpoint) {
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
