<template>
  <el-table :data="quizzes" empty-text="Loading..." stripe border style="width: 100%">
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="id" label="ID" width="50"></el-table-column>
    <el-table-column label="Author ID" width="100">
      <template slot-scope="props">
        <!-- FIXME How to get/show author information (e.g. first and last names, email, etc.) -->
        <router-link :to="{ name: 'users.view', params: { userId: props.row.user_id } }">{{ props.row.user_id }}</router-link>
        <!-- <router-link :to="{ name: 'users.view', params: { userId: props.row.user_id } }">{{ props.row.username }}</router-link> -->
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Name" width="300"></el-table-column>
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
</template>
