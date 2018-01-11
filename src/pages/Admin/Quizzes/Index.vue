<template>
  <el-row :gutter="40">
    <el-col :sm="24">
      <quizzes-list></quizzes-list>
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
