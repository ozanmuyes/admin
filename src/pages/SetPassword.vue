<template>
  <!-- TODO Place the form, and set the colors of the page in the styles -->
  <div :class="$style.page">
    <div :class="$style.container">
      <div :class="$style.subContainer">
        <h1 :class="$style.formHeader" v-t="'router.set_password.title'"></h1>

        <user-password-form @submit="doUpdate"></user-password-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { setPassword } from 'api/auth';

  import UserPasswordForm from 'components/UserPasswordForm';

  export default {
    components: { UserPasswordForm },
    metaInfo() {
      return {
        title: this.$t('router.set_password.title'),
      };
    },
    data() {
      return {
        userId: -1,
        //
      };
    },
    methods: {
      doUpdate(password) {
        setPassword(this.userId, password, this.token);
      },
    },
    mounted() {
      // TODO Get token from query string; \
      // AND extract the user id from it (the 'sub' claim)
      // OR get user id as another query parameter
      this.token = this.$route.query.token;

      // TODO Set `this.userId` here
      this.userId = this.$route.query.id;
    },
  };
</script>

<style>
  body {
    min-height: 264px;
  }
</style>

<style module>
  .page {
    height: 100%;
    background-color: #2d3a4b;
    color: white;
  }

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .subContainer {
    width: 92%;
  }

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    .subContainer {
      width: 70%;
    }
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    .subContainer {
      width: 40%;
    }
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {
    .subContainer {
      width: 29%;
    }
  }

  /* Extra large devices (large desktops, 1200px and up) */
  @media (min-width: 1200px) {
    .subContainer {
      width: 24%;
      max-width: 380px;
    }
  }

  /* Extra Extra large devices (large desktops, 1200px and up) */
  @media (min-width: 1440px) {
    .subContainer {
      width: 20%;
    }
  }

  .formHeader {
    text-align: center;
  }
</style>
