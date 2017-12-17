<template>
  <div>
    <span>edit user: {{ user_name }}</span>

    <br>
    <router-link to="/users/1/edit">Edit user with the id of 1</router-link>
  </div>
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
