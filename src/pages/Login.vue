<template>
  <span>login page</span>
</template>

<script>
  // TODO emit USER_LOGGED_IN event
  import { USER_LOGGED_IN } from 'event/types';

  export default {
    created() {
      // Simulate login
      this.$store.state.user = {
        access_token: 'bari',
        role: 'admin',
      };
      this.$bus.$emit(USER_LOGGED_IN);
      this.$router.replace({ name: 'app.index' });
    },
    //
  };
</script>
