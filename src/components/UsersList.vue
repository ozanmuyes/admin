<template>
  <div>
    <el-table :data="users" empty-text="No Data" stripe  border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="first_name" label="First Name" width="120"></el-table-column>
      <el-table-column prop="last_name" label="Last Name" width="120"></el-table-column>
      <el-table-column prop="username" label="Username" width="140"></el-table-column>
      <el-table-column prop="role" label="Role" width="100"></el-table-column>
      <el-table-column prop="email" label="E-Mail" :resizable="false"></el-table-column>

      <el-table-column fixed="right" label="Operations" width="160" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <router-link :to="{ name: 'users.view', params: { userId: scope.row.id } }">View</router-link>
          </el-button>

          <el-button type="text" size="small">
            <router-link :to="{ name: 'users.edit', params: { userId: scope.row.id } }">Edit</router-link>
          </el-button>

          <el-button @click="deleteUser(scope.$index, scope.row)" type="text" size="small" :class="$style.deleteUserBtn">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-size="usersPagination.limit"
        :total="usersPagination.count"
        @current-change="paginate">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import {
    list as listUsers,
    remove as removeUser,
  } from 'api/users';

  export default {
    data() {
      return {
        perPage: 3, // API endpoint pagination limit
        pageNo: -1, // 1-based page number to use on the request to API endpoint
        users: [],
        usersPagination: {
          page_count: -1,
          current_page: -1,
          has_next_page: false,
          has_prev_page: false,
          count: -1,
        },
      };
    },
    created() {
      this.pageNo = 1;
    },
    methods: {
      paginate(currentPageNo) {
        this.pageNo = currentPageNo;
      },
      deleteUser(index, user) {
        this.$confirm(`Are you sure to delete the user with username '${user.username}'?`, 'Delete User', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning',
        })
          .then(() => {
            this.$prompt('Please enter the username below to delete the user.', 'Delete User', {
              confirmButtonText: 'Delete',
              confirmButtonClass: 'el-button--danger',
            })
              .then((result) => {
console.log(result, user.username);
debugger;
                if (result.value === user.username) {
//                  removeUser(user.id)
//                     .then((response) => {
// console.log(response);
                      // Remove the deleted user from the 'data.users' array
                      this.users.splice(index, 1);

                      // TODO Update the pagination if necessary
//                     })
//                     .catch((error) => {
// console.log(error);
//                       // If any error occurred do NOT delete the user from the 'data'
//                       // and inform the admin that the operation failed
//                     });
                } else {
                  this.$message({
                    type: 'error',
                    message: 'Username entry mismatch. Will not delete the user.',
                  });
                }
              })
              .catch(() => {
                // Do nothing, user cancelled
              });
          })
          .catch(() => {
            // Do nothing, user cancelled
          });
      },
    },
    watch: {
      pageNo(value) {
        // `value` is 1-based

        listUsers({
          deleteExtras: false,
          params: {
            limit: this.perPage,
            page: this.pageNo,
          },
        })
          .then((response) => {
            this.users = response.data.data;
            if (this.usersPagination.page_count === -1) {
              this.usersPagination = response.data.pagination;
            }
          })
          .catch((error) => {
  console.log(error); // FIXME
          });
      },
    },
  };
</script>

<style module>
  .deleteUserBtn {
    color: red;
  }
  .deleteUserBtn:hover {
    color: maroon;
  }
</style>
