<template>
  <div>
    <el-table :data="users" empty-text="Loading..." stripe border style="width: 100%">
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

          <el-button @click="removeRecord(scope.$index, scope.row)" type="text" size="small" :class="$style.removeRecordBtn">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pagination.limit"
        :total="pagination.count"
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

  import {
    USER_ADDED,
    USER_UPDATED,
    USER_REMOVED,
  } from 'event/types';

  export default {
    data() {
      return {
        perPage: 3, // API endpoint pagination limit
        pageNo: -1, // 1-based page number to use on the request to API endpoint
        users: [],
        pagination: {
          page_count: -1,
          current_page: -1,
          has_next_page: false,
          has_prev_page: false,
          count: -1,
        },
      };
    },
    mounted() {
      this.$bus.on(USER_ADDED, (user) => {
        this.users.push(user);

        // TODO Re-calculate pagination
      });
      this.$bus.on(USER_UPDATED, ({ diffMap, diffValues }) => {
        // TODO Use `diffMap` to see which of the values have changed, \
        //          `diffValues` holds the updated values.
      });
      this.$bus.on(USER_REMOVED, (removedUser) => {
        // Remove the deleted user from the 'data.users' array
        const removedUserIndex = this.users.findIndex(user => (user.id === removedUser.id));

        if (removedUserIndex > -1) {
          this.users.splice(removedUserIndex, 1);
        }
      });
    },
    created() {
      this.pageNo = 1;
    },
    beforeDestroy() {
      this.$bus.off(USER_ADDED);
      this.$bus.off(USER_UPDATED);
      this.$bus.off(USER_REMOVED);
    },
    methods: {
      paginate(currentPageNo) {
        this.pageNo = currentPageNo;
      },
      recalculatePaginate() {
        // this.pagination = response.data.pagination;

        if (this.users.length > (this.perPage * this.pagination.page_count)) {
          // TODO User was added, so add new page
debugger;
          this.pagination.page_count += 1;
        } else if (this.users.length > (this.perPage * this.pagination.count)) {
          // TODO User was removed, so remove last page
debugger;
          this.pagination.page_count += 1;
        }
      },
      removeRecord(index, user) {
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
                if (result.value === user.username) {
//                  removeUser(user.id)
//                     .then((response) => {
// console.log(response);
                      const removedUser = this.users[index];

                      // Do NOT remove from the array immediately, instead do it in event callback
                      // // Remove the deleted user from the 'data.users' array
                      // this.users.splice(index, 1);

                      // TODO Update the pagination if necessary
                      this.$bus.emit(USER_REMOVED, removedUser);
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
            if (this.pagination.page_count === -1) {
              this.pagination = response.data.pagination;
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
  .removeRecordBtn {
    color: red;
  }
  .removeRecordBtn:hover {
    color: maroon;
  }
</style>
