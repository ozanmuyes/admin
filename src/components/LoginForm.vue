<template>
  <el-form
    class="login-form_"
    label-position="left"
    :model="form"
    ref="form"
    :rules="rules"
  >
    <el-form-item prop="email">
      <el-input
        auto-complete="off"
        :placeholder="$t(`${langPrefix}login.email.placeholder`)"
        prefix-icon="fa fa-fw fa-envelope"
        type="email"
        v-model="form.email"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        auto-complete="off"
        :placeholder="$t(`${langPrefix}login.password.placeholder`)"
        prefix-icon="fa fa-fw fa-unlock-alt"
        type="password"
        v-model="form.password"
        @keyup.enter.native="onSubmit"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-button
            class="button"
            type="primary"
            @click="onSubmit"
          >
            {{ $t(`${langPrefix}login.submitButton`) }}
          </el-button>
        </el-col>

        <el-col :span="8">
          <el-button
            class="button"
            plain
            type="danger"
            @click="resetForm"
          >
            {{ $t(`${langPrefix}login.resetButton`) }}
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
  import { LOGIN_ERROR } from 'event/types';

  export default {
    props: {
      langPrefix: {
        type: String,
        default: 'forms.',
      },
    },
    data() {
      return {
        form: {
          email: 'john@does.com', // TODO Remove before the flight
          password: 'john@does.co', // TODO Remove before the flight
        },
        rules: {
          email: [
            { required: true, message: this.$t(`${this.langPrefix}login.email.errors.required`), trigger: 'blur' },
            { type: 'email', message: 'not valid email', trigger: 'blur' },
// { pattern: 'foo@bar.baz', message: this.$t(`${this.langPrefix}login.email.errors.inval
// idDomain'), trigger: 'blur' },
            { min: 10, max: 100, message: this.$t(`${this.langPrefix}login.email.errors.length`, { min: 10, max: 100 }), trigger: 'blur' },
          ],
          password: [
            { required: true, message: this.$t(`${this.langPrefix}login.password.errors.required`), trigger: 'blur' },
            { min: 6, message: this.$t(`${this.langPrefix}login.password.errors.length`, { min: 6 }), trigger: 'change' },
          ],
        },
      };
    },
    mounted() {
      this.$bus.on(LOGIN_ERROR, this.onError);
    },
    beforeDestroy() {
      this.$bus.off(LOGIN_ERROR);
    },
    methods: {
      translate(text) {
        return `${this.langPrefix}${text}`;
      },
      onSubmit() {
        this.$refs.form.validate((isFormValid) => {
          if (!isFormValid) {
            // TODO Maybe show error message
            return;
          }

          this.$emit('submit', this.form.email, this.form.password);
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      onError({ message, title }) {
        // FIXME Uncaught cancel
        this.$alert(message, title, {
          type: 'error',
          // See http://element.eleme.io/#/en-US/component/message-box#options
          //
        });
      },
    },
  };
</script>

<style scope>
  .button {
    width: 100%;
  }
</style>
