<template>
  <el-form
    label-position="top"
    :model="form"
    ref="form"
    :rules="rules"
  >
    <el-form-item :label="titleCase(t('password'))" prop="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>

    <el-form-item :label="titleCase(t('re-password'))" prop="repassword">
      <el-input v-model="form.repassword" type="password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ titleCase($t(saveButtonText)) }}</el-button>
      <el-button type="danger" plain @click="onReset">{{ titleCase($t(resetButtonText)) }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { titleCase as titleCaseFilter } from 'filters';

  export default {
    props: {
      saveButtonText: {
        type: String,
        default: 'save',
      },
      resetButtonText: {
        type: String,
        default: 'reset',
      },
    },
    data() {
      return {
        form: {
          password: 'asd123', // TODO Remove before flight
          repassword: 'asd123', // TODO Remove before flight
        },
        rules: {
          // TODO password and re-password MUST be same
        },
        //
      };
    },
    methods: {
      t(...params) {
        const tag = params[0];
        params.splice(0, 1);

        return this.$t(`forms.userAddit.${tag}`, ...params);
      },
      titleCase(text) {
        return titleCaseFilter(text);
      },
      resetForm() {
        this.$refs.form.resetFields();
        this.user = { ...this.data };
      },
      onSubmit() {
        this.$emit('submit', this.form.password);
      },
      onReset() {
        this.resetForm();
      },
      //
    },
  };
</script>
