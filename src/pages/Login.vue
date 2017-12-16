<template>
  <!-- TODO Place the form, and set the colors of the page in the styles -->
  <div :class="$style.page">
    <div :class="$style.container">
      <div :class="$style.subContainer">
        <h1 :class="$style.formHeader" v-t="'router.login.title'"></h1>

        <login-form @submit="doLogin"></login-form>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginForm from 'components/LoginForm';

  import { TRY_USER_LOGIN } from 'event/types';

  export default {
    components: { LoginForm },
    metaInfo() {
      return {
        title: this.$t('router.login.title'),
      };
    },
    methods: {
      doLogin(email, password) {
        this.$bus.$emit(TRY_USER_LOGIN, { email, password });

        // TODO Call the `login` method of the API (from auth particularly)
//        try {
//          await this.$store.dispatch({
//            type: 'login',
//            email,
//            password,
//          });
//
//          this.$router.replace({ path: `/${this.$store.state.user.role}` });
//        } catch (error) {
//          /**
//           * error = {
//           *  config: {...},
//           *  data: {
//           *    error: '...',
//           *    status: 418,
//           *  },
//           *  headers: {...},
//           *  request: new XMLHttpRequest(),
//           *  status: 418,
//           *  statusText: 'I\'m a teapot.'
//           * }
//           */
//          this.$alert('E-mail address and/or password is wrong.', 'Login Error', {
//          // OR use `error.response.data.error`
//            type: 'error',
//          });
//        }
      },
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
