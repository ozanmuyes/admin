<template>
  <!-- Nothing to show here -->
</template>

<script>
  import { LOGOUT } from 'store/mutation-types';

  export default {
    created() {
      console.log(this);
debugger;
      this.$confirm('Are you sure you want to log out?', 'Logout?', {
        type: 'error',
        confirmButtonText: 'Yes',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: 'No',
      })
      .then((/* response */) => {
        // if (response === 'confirm') {
        this.doLogout();
        // }
      })
      .catch((err) => {
        //
      });
    },
    methods: {
      doLogout() {
        this.$store.commit(LOGOUT);

        window.location = 'http://localhost:8080'; // TODO navigate to `store.state.links.homepage`
        // window.location = 'http://localhost:8765/'; // TODO navigate to `store.state.links.homepage`
      },
    },
  };
</script>
