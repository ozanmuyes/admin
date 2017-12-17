<template>
  <div>
    <el-row>
      <el-col :sm="24" :md="12" :lg="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Add User</span>
          </div>

          <user-addit-form @submitted="userAdded"></user-addit-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import UserAdditForm from 'components/UserAdditForm';

  export default {
    components: {
      UserAdditForm,
    },
    methods: {
      userAdded() {
console.log('routing to \'users.index\'...');
        // this.$router.push({ name: 'users.index' });
      },
    },
  };
</script>
