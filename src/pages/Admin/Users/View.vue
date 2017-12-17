<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else>
      <span>view user: {{ user.id }}</span>

      <br>
      <router-link :to="{ name: 'users.edit' }">Edit</router-link>
    </div>
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
      loading() {
        return (this.user.id === -1);
      },
    },
  };
</script>
