<template>
  <div>
    <el-table :data="quizzes" empty-text="Loading..." stripe border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column label="Author ID" width="100">
        <template slot-scope="props">
          <router-link :to="{ name: 'users.view', params: { userId: props.row.user_id } }">{{ props.row.user_id }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="170"></el-table-column>
      <el-table-column prop="description" label="Description" :resizable="false"></el-table-column>

      <el-table-column fixed="right" label="Operations" width="160" :resizable="false">
        <template slot-scope="props">
            <el-button type="text" size="small">
              <router-link :to="{ name: 'quizzes.view', params: { quizId: props.row.id } }">View</router-link>
            </el-button>

            <el-button type="text" size="small">
              <router-link :to="{ name: 'quizzes.edit', params: { quizId: props.row.id } }">Edit</router-link>
            </el-button>

            <el-button @click="removeRecord(props.$index, props.row)" type="text" size="small" :class="$style.removeRecordBtn">Delete</el-button>
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
    list as listQuizzes,
    remove as removeQuiz,
  } from 'api/quizzes';

  export default {
    data() {
      return {
        perPage: 3, // API endpoint pagination limit
        pageNo: -1, // 1-based page number to use on the request to API endpoint
        quizzes: [],
        pagination: {
          page_count: -1,
          current_page: -1,
          has_next_page: false,
          has_prev_page: false,
          count: -1,
        },
      };
    },
    methods: {
      paginate(currentPageNo) {
        this.pageNo = currentPageNo;
      },
      recalculatePaginate() {
        // this.pagination = response.data.pagination;

        if (this.quizzes.length > (this.perPage * this.pagination.page_count)) {
          // TODO User was added, so add new page
debugger;
          this.pagination.page_count += 1;
        } else if (this.quizzes.length > (this.perPage * this.pagination.count)) {
          // TODO User was removed, so remove last page
debugger;
          this.pagination.page_count += 1;
        }
      },
      removeRecord(index, quiz) {
        this.$confirm(`Are you sure to delete the quiz with name '${quiz.name}'?`, 'Delete Quiz', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning',
        })
          .then(() => {
            this.$prompt('Please enter the quiz name below to delete the quiz.', 'Delete Quiz', {
              confirmButtonText: 'Delete',
              confirmButtonClass: 'el-button--danger',
            })
              .then((result) => {
                if (result.value === quiz.name) {
//                  removeUser(quiz.id)
//                     .then((response) => {
// console.log(response);
                      const removedUser = this.quizzes[index];

                      // Do NOT remove from the array immediately, instead do it in event callback
                      // // Remove the deleted quiz from the 'data.quizzes' array
                      // this.quizzes.splice(index, 1);

                      // TODO Update the pagination if necessary
//                     })
//                     .catch((error) => {
// console.log(error);
//                       // If any error occurred do NOT delete the quiz from the 'data'
//                       // and inform the admin that the operation failed
//                     });
                } else {
                  this.$message({
                    type: 'error',
                    message: 'Quiz name entry mismatch. Will not delete the quiz.',
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
    created() {
      this.pageNo = 1;
    },
    watch: {
      pageNo(value) {
        // `value` is 1-based

        listQuizzes({
          deleteExtras: false,
          params: {
            limit: this.perPage,
            page: this.pageNo,
          },
        })
          .then((response) => {
            this.quizzes = response.data.data;
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
