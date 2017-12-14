<template>
  <div id="app" :class="sizeClassForBreakpoint" ref="divApp">
    <responsive-detector @change="onResponsiveChange"></responsive-detector>
    <router-view></router-view>
  </div>
</template>

<script>
  import ResponsiveDetector from 'components/ResponsiveDetector';

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
    methods: {
      onResponsiveChange(classForBreakpoint) {
        this.classForBreakpoint = classForBreakpoint;

        // Do NOT commit a mutate, because it fills up the whole Vuex panel entries
        this.$store.state.app.breakpoint = classForBreakpoint;
      },
    },
  };
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>
