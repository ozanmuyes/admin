<!--
Add media queries to 'index.html' which changes '#app:before.content', i.e.
```css
#app:before {
  display: none;
}
@media only screen and (min-width: 320px) {
  #app:before {
    content: "mobile"; /* This will be used as breakpoint in the application */
  }
}
```
-->

<template>
  <div style="width: 100%; height: 100%; display: none;"></div>
</template>

<script>
  import throttle from 'lodash.throttle';

  export default {
    mounted() {
      console.log(`App component mounted at ${(+new Date())}`);
      // console.log(`App component mounted in ${(+new Date()) - global.lastFinishTime} msecs.`);
      // global.lastFinishTime = (+new Date());

      this.actOnResize();

      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    computed: {
      // This is a computed property because the `throttle` function
      // returns a function. Which we want to cache after it has
      // been calculated once.
      handleResize() {
        const inst = this;

        return throttle(() => inst.actOnResize(), 400, false);
      },
    },
    methods: {
      actOnResize() {
        const bodyBeforeContent = window.getComputedStyle(document.querySelector('#app'), ':before')
          .getPropertyValue('content').replace(/"/g, '');

        if (this.$store.state.app.breakpoint !== bodyBeforeContent) {
          this.$emit('change', bodyBeforeContent);
        }
      },
    },
  };
</script>
