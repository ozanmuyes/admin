<template>
  <el-menu class="navbar" mode="vertical">
    <app-hamburger class="hamburger-container"
      :isActive="isMenuCollapsed"
      @toggled="toggleSidebar"
    ></app-hamburger>

    <app-breadcrumbs class="breadcrumb-container" :dashboard-path="'/'" dashboard-path="/"></app-breadcrumbs>

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar" :title="username">
          <i class="el-icon-caret-bottom"></i>
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Profile
            </el-dropdown-item>
          </router-link>

          <!-- <el-dropdown-item v-if="isLoggedIn" divided> NNCHKHRMR -->
          <router-link to="/logout">
            <el-dropdown-item divided>
              Logout
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { TOGGLE_SIDEBAR } from 'store/mutation-types';

  import AppBreadcrumbs from 'components/AppBreadcrumbs';
  import AppHamburger from 'components/AppHamburger';
  import SvgIcon from 'components/SvgIcon';

  export default {
    components: {
      AppBreadcrumbs,
      AppHamburger,
      SvgIcon,
    },
    computed: {
      isMenuCollapsed() {
        return !this.$store.state.app.hasSidebarOpened;
      },
      ...mapGetters([
        // 'isLoggedIn', // No need to check here anymore [NNCHKHRMR]

        'username',
        'avatar',
        // 'language',
      ]),
    },
    methods: {
      toggleSidebar() {
        this.$store.commit(TOGGLE_SIDEBAR);
      },
      // TODO
      // handleSetLanguage(lang) {
      //   this.$i18n.locale = lang;
      //   this.$store.dispatch('setLanguage', lang);
      //   this.$message({
      //     message: 'switch language success',
      //     type: 'success',
      //   });
      // },
    },
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus{
       outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .international{
        vertical-align: top;
        .international-icon{
          font-size: 20px;
          cursor: pointer;
          vertical-align: -5px;
        }
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
