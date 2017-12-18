<template>
  <el-row :gutter="40">
    <el-col :sm="24" :md="18" :lg="14">
      <quizzes-list></quizzes-list>
    </el-col>

    <el-col :sm="24" :md="6" :lg="8">
      <!-- TODO Add list companion here -->
    </el-col>
  </el-row>
</template>

<script>
  import QuizzesList from 'components/QuizzesList';

  export default {
    components: {
      QuizzesList,
    },
    //
  };
</script>
