<template>
  <el-row :gutter="40">
    <el-col :sm="24" :md="18" :lg="14">
      <users-list></users-list>
    </el-col>

    <el-col :sm="24" :md="6" :lg="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Add User</span>
        </div>

        <user-addit-form @submitted="userAdded"></user-addit-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import UsersList from 'components/UsersList';
  import UserAdditForm from 'components/UserAdditForm';

  export default {
    components: {
      UsersList,
      UserAdditForm,
    },
    methods: {
      userAdded() {
        this.$message({ type: 'success', message: 'User created successfully.' });

        // TODO If not cleared, clear the form fields
        // TODO Refresh the UserLists via EVENT
      },
    },
  };
</script>
