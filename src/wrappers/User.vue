<template>
  <router-view :user="user"></router-view>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import { view as viewUser } from 'api/users';

  export default {
    data() {
      return {
        user: {
          email: '',
          id: -1,
          role: '',
          first_name: '',
          last_name: '',
          username: '',

          is_enabled: false,
          verified_at: '',

          created_at: '',
          modified_at: '',
          deleted_at: null,
        },
      };
    },
    methods: {
      updateData() {
        viewUser(this.$route.params.userId)
          .then((userData) => {
            this.user = userData;
          })
          .catch((error) => {
            // TODO Cancel the navigation - HATTA bu api call'ı componentin nav. guard'ında yap
          });
      },
    },
    created() {
      this.updateData();
    },
    watch: {
      // eslint-disable-next-line
      '$route'() {
        this.updateData();
      },
    },
    // TODO Watch '$route' here - use the extracted method
  };
</script>
