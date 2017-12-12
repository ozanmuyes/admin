<template>
  <div>
    <svg t="1492500959545" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"
      class="wscn-icon hamburger"
      :class="{'is-toggled': isToggled}"
      @click="onClick"
    >
      <path p-id="1692" d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"></path>
      <path p-id="1693" d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"></path>
      <path p-id="1694" d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"></path>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'AppHamburger',
    props: {
      // isActive: {
      //   type: Boolean,
      //   default: false,
      // },
    },
    data() {
      return {
        isToggled: true,
      };
    },
    methods: {
      onClick() {
        this.isToggled = !this.isToggled;

        this.$emit('toggled');
      },
    },
  };
</script>

<style scoped>
  .hamburger {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
    transition: .38s;
    transform-origin: 50% 50%;
  }
  .hamburger.is-toggled {
    transform: rotate(0deg);
  }
</style>
