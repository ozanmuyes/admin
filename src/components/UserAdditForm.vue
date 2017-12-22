<template>
  <el-form
    label-position="top"
    :model="user"
    ref="form"
    :rules="rules"
    size="small"
  >
    <el-form-item :label="titleCase(t('email'))" prop="email">
      <el-input v-model="user.email"></el-input>
    </el-form-item>

    <!-- <el-form-item v-if="!isEditing" :label="titleCase(t('password'))" prop="password">
      <el-input v-model="user.password" type="password"></el-input>
    </el-form-item> -->

    <el-form-item :label="titleCase(t('role'))" prop="role">
      <el-select v-model="user.role" :placeholder="t('rolePlaceholder')">
        <el-option label="Admin" value="admin"></el-option>
        <el-option label="Lecturer" value="lecturer"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item :label="titleCase(t('first_name'))" prop="first_name">
      <el-input v-model="user.first_name"></el-input>
    </el-form-item>

    <el-form-item :label="titleCase(t('last_name'))" prop="last_name">
      <el-input v-model="user.last_name"></el-input>
    </el-form-item>

    <el-form-item :label="titleCase(t('username'))" prop="username">
      <el-input v-model="user.username"></el-input>
    </el-form-item>

    <!-- <el-form-item :label="titleCase(t('is_enabled'))">
      <el-switch v-model="user.is_enabled"></el-switch>
    </el-form-item> -->

    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ titleCase($t(saveButtonText)) }}</el-button>
      <el-button type="danger" plain @click="onReset">{{ titleCase($t(resetButtonText)) }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  /* eslint-disable max-len, no-unused-vars */

  import {
    add as addUser,
    edit as editUser,
  } from 'api/users';
  import {
    USER_ADDED,
    USER_UPDATED,
  } from 'event/types';
  import { titleCase as titleCaseFilter } from 'filters';
  import deep from 'deep-diff';

  const emptyUser = {
    id: -1,
    email: '',
    // password: '',
    role: '',
    first_name: '',
    last_name: '',
    username: '',

    // is_enabled: false,
    // // verified_at: '',

    // // created_at: '',
    // // modified_at: '',
    // // deleted_at: null,
  };

  export default {
    props: {
      data: {
        type: Object,
        required: false,
        default: () => ({ ...emptyUser }),
      },
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
        user: emptyUser,
        rules: {
          email: [
            { required: true, message: this.t('rules.required', [this.titleCase(this.t('email'))]), trigger: 'blur' },
            { type: 'email', message: this.t('rules.type', [this.titleCase(this.t('email'))]), trigger: 'blur' },
            { min: 10, max: 100, message: this.t('rules.minmax', [this.titleCase(this.t('email')), 10, 100]), trigger: 'blur' },
          ],
          // password: [
          //   { required: true, message: this.t('rules.required', [this.titleCase(this.t('password'))]), trigger: 'blur' },
          //   { min: 6, message: this.t('rules.min', [this.titleCase(this.t('password')), 6]), trigger: 'blur' },
          //   //
          // ],
          role: [
            { required: true, message: this.t('rules.required', [this.titleCase(this.t('role'))]), trigger: 'blur' },
            { type: 'enum', enum: ['admin', 'lecturer'], message: this.t('rules.type', [this.titleCase(this.t('role'))]), trigger: 'blur' },
          ],
          first_name: [
            { required: true, message: this.t('rules.required', [this.titleCase(this.t('first_name'))]), trigger: 'blur' },
            //
          ],
          last_name: [
            { required: true, message: this.t('rules.required', [this.titleCase(this.t('last_name'))]), trigger: 'blur' },
            //
          ],
          username: [
            { required: true, message: this.t('rules.required', [this.titleCase(this.t('username'))]), trigger: 'blur' },
            //
          ],
        },
      };
    },
    computed: {
      isEditing() {
        return (this.data.id !== -1);
      },
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
      clearForm() {
        this.$refs.form.resetFields();
        this.user = { ...emptyUser };
      },
      onSubmit() {
        this.$refs.form.validate((isValid) => {
          if (isValid) {
            if (this.isEditing) {
              // Updating the resource...

              // TODO Check if there is any change
              const diff = deep.diff(this.data, this.user);
              if (typeof diff === 'undefined') {
                // NOTE No any change was made
console.warn('No changes, will do nothing.');
              } else {
                const objToSend = {};
                deep.observableDiff(this.data, this.user, d => deep.applyChange(objToSend, diff, d));

                editUser(this.data.id, objToSend)
                  .then(() => {
                    this.$emit('submitted');
                    this.$bus.$emit(USER_UPDATED, { diff, objToSend });
                  })
                  .catch((error) => {
                    this.$alert(error.response.data.message, 'Error', { type: 'error' }); // TODO translate
                  });
              }
            } else {
              // Adding new user...

              addUser(this.user)
                .then(() => {
                  // NOTE User has been added

                  this.$emit('submitted');
                  this.$bus.$emit(USER_ADDED, this.user);
                })
                .catch((error) => {
                  this.$alert(error.response.data.message, 'Error', { type: 'error' }); // TODO translate
                });
            }
          }
        });
      },
      onReset() {
        this.resetForm();
      },
      onClear() {
        this.clearForm();
      },
    },
    mounted() {
      // Wait for the resource data to be arrived.
      // The reason we are not watching the prop
      // ('data' prop) is to not to lose after
      // the data was loaded and user made
      // some changes.
      setTimeout(() => {
        this.user = { ...this.data };
      }, 50); // The delay for the time out is crucial
    },
  };
</script>
