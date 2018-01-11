<!-- TODO Copy from 'pages/Admin/Quizzes/View.vue' -->

<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else>
      <span>view user: {{ entity.id }}</span>

      <br>
      <router-link :to="{ name: 'users.edit' }">Edit</router-link>
      <br>
      <router-link :to="{ name: 'users.view', params: { userId: 1 } }">View User with Id 2</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    // props: {
    //   user: {
    //     type: Object,
    //     required: true,
    //   },
    // },
    data() {
      return {
        entity: {
          id: -1,
          // TODO Copy user keys from store
        },
      };
    },
    computed: {
      loading() {
        return (this.entity.id === -1);
      },
    },
    created() {
      // TODO use 'api' to populate `entity`
    },
  };
</script>
