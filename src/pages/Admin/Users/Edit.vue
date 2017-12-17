<template>
  <span>edit user: {{ user_name }}</span>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    computed: {
      user_name() {
        return `${this.user.first_name} ${this.user.last_name}`;
      },
    },
  };
</script>
