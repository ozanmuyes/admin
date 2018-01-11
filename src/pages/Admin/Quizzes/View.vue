<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else>
      <h1 v-text="entity.name">
        <small v-text="entity.description"></small>
      </h1>
      <router-link :to="{ name: 'quizzes.edit' }" disabled>Edit</router-link>

      <h2>Questions and Answers</h2>
      <ol>
        <li
          v-for="question of entity.questions"
          :key="question.text"
        >
          <h3 v-text="question.text"></h3>
          <p>Time Limit: {{ question.time_limit }}</p>
          <p>Score: {{ question.score }}</p>
          <p>
            <h4>Answers</h4>
            <ul
              v-for="answer of question.answers"
              :key="answer.text"
            >
              {{ answer.text }}
            </ul>
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import { get as getQuiz } from 'api/quizzes';

  export default {
    data() {
      return {
        entity: {
          id: -1,
          // TODO Copy quiz keys from store
        },
      };
    },
    computed: {
      loading() {
        return (this.entity.id === -1);
      },
    },
    created() {
      const quizId = this.$route.params.quizId;

      getQuiz(quizId)
      .then((response) => {
        this.entity = response;
      })
      .catch((error) => {
        this.$alert(
        `Error occured while getting user information.\n${error.response.data.message}`,
        'Error',
        { type: 'error' }); // TODO translate [TRNSRRRMSG]
      });
    },
  };
</script>

