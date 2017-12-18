<template>
  <div>
    <el-row>
      <el-col :sm="24" :md="12" :lg="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Edit User</span>
          </div>

          <user-addit-form saveButtonText="update" :data="user" @submitted="userUpdated"></user-addit-form>
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
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    computed: {
      user_name() {
        return `${this.user.first_name} ${this.user.last_name}`;
      },
    },
    methods: {
      userUpdated() {
console.log('routing to \'users.index\'...');
        // this.$router.push({ name: 'users.index' });
      },
    },
  };
</script>
