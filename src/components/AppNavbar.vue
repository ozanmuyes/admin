<template>
  <el-menu class="navbar" mode="horizontal">
    <app-hamburger class="hamburger-container"
      :isActive="sidebar.opened"
      @toggled="toggleSidebar"
    ></app-hamburger>

    <app-breadcrumb class="breadcrumb-container"></app-breadcrumb>

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          <i class="el-icon-caret-bottom"></i>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">
              Profile
            </router-link>
          </el-dropdown-item>

          <el-dropdown-item v-if="isLoggedIn" divided>
            <router-link to="/logout">Logout</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import {
    mapState,
    mapGetters,
  } from 'vuex';
  import { TOGGLE_SIDEBAR } from 'store/mutation-types';

  import AppBreadcrumb from 'components/AppBreadcrumb';
  import AppHamburger from 'components/AppHamburger';
  import SvgIcon from 'components/SvgIcon';

  export default {
    components: {
      AppBreadcrumb,
      AppHamburger,
      SvgIcon,
    },
    data() {
      return {
        ...mapState([
          'sidebar',
        ]),
      };
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',

        'name',
        'avatar',
        'language',
      ]),
    },
    methods: {
      toggleSidebar() {
        this.$store.commit(TOGGLE_SIDEBAR);
      },
      handleSetLanguage(lang) {
        this.$i18n.locale = lang;
        this.$store.dispatch('setLanguage', lang);
        this.$message({
          message: 'switch language success',
          type: 'success',
        });
      },
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
