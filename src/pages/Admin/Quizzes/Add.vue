<template>
  <div>
    <el-row>
      <el-col :sm="24">
      <!-- <el-col :sm="24" :md="12" :lg="6"> -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Add Quiz</span>
          </div>

          <quiz-add-form @submitted="quizAdded"></quiz-add-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import QuizAddForm from 'components/QuizAddForm';

  export default {
    components: {
      QuizAddForm,
    },
    methods: {
      quizAdded() {
console.log('routing to \'users.index\'...');
        // this.$router.push({ name: 'quizzes.index' });
      },
    },
  };
</script>
