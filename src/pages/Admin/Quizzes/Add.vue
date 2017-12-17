<template>
  <div>
    <span>admin add quiz</span>

    <br>
    <draggable :list="questions" class="dragArea">
      <div v-for="question in questions"
        :key="question.text"
      >{{question.name}}</div>
    </draggable>

    <el-row>
      <el-col :sm="12" :md="12" :lg="6">
        <h2>Questions</h2>

        <draggable
          :list="questions"
        >
          <div v-for="(question, questionIndex) in questions"
            :key="question.text"
          >
            <span @click="selectQuestion(questionIndex)">{{ question.text }}</span>
          </div>
        </draggable>
      </el-col>

      <el-col :sm="12" :md="12" :lg="6">
        <h2>Answer</h2>

        <answers-accordion :answers="selectedQuestionAnswers"></answers-accordion>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import AnswersAccordion from './AnswersAccordion';

  export default {
    components: {
      draggable,
      AnswersAccordion,
    },
    data() {
      return {
        questions: [
          {
            id: 1,
            text: 'First question',
            time_limit: 10,
            score: 100,
            answers: [
              { name: '1', text: 'lorem1', is_right: false },
              { name: '2', text: 'ipsum1', is_right: false },
              { name: '3', text: 'dolor1', is_right: true },
              { name: '4', text: 'sit1', is_right: false },
            ],
          },
          {
            id: 2,
            text: 'Second question',
            time_limit: 11,
            score: 100,
            answers: [
              { name: '1', text: 'lorem2', is_right: true },
              { name: '2', text: 'ipsum2', is_right: false },
              { name: '3', text: 'dolor2', is_right: false },
              { name: '4', text: 'sit2', is_right: false },
            ],
          },
          {
            id: 3,
            text: 'Third question',
            time_limit: 12,
            score: 100,
            answers: [
              { name: '1', text: 'lorem3', is_right: false },
              { name: '2', text: 'ipsum3', is_right: false },
              { name: '3', text: 'dolor3', is_right: false },
              { name: '4', text: 'sit3', is_right: true },
            ],
          },
          {
            id: 4,
            text: 'Fourth question',
            time_limit: 13,
            score: 100,
            answers: [
              { name: '1', text: 'lorem4', is_right: false },
              { name: '2', text: 'ipsum4', is_right: false },
              { name: '3', text: 'dolor4', is_right: true },
              { name: '4', text: 'sit4', is_right: false },
            ],
          },
          {
            id: 5,
            text: 'Fifth question',
            time_limit: 14,
            score: 100,
            answers: [
              { name: '1', text: 'lorem5', is_right: false },
              { name: '2', text: 'ipsum5', is_right: true },
              { name: '3', text: 'dolor5', is_right: false },
              { name: '4', text: 'sit5', is_right: false },
            ],
          },
          {
            id: 6,
            text: 'Sixth question',
            time_limit: 15,
            score: 100,
            answers: [
              { name: '1', text: 'lorem6', is_right: true },
              { name: '2', text: 'ipsum6', is_right: false },
              { name: '3', text: 'dolor6', is_right: false },
              { name: '4', text: 'sit6', is_right: false },
            ],
          },
          {
            id: 7,
            text: 'Seventh question',
            time_limit: 16,
            score: 100,
            answers: [
              { name: '1', text: 'lorem7', is_right: false },
              { name: '2', text: 'ipsum7', is_right: false },
              { name: '3', text: 'dolor7', is_right: false },
              { name: '4', text: 'sit7', is_right: true },
            ],
          },
        ],
        list: [
          { name: 'John' },
          { name: 'Joao' },
          { name: 'Jean' },
        ],
        openAnswerIndex: -1,
        selectedQuestionAnswers: { // TODO Change this when question is clicked
          name: '',
          text: '',
          is_right: false,
        },
        //
      };
    },
    methods: {
      selectQuestion(questionIndex) {
        this.selectedQuestionAnswers = this.questions[questionIndex].answers;
      },
      selectAnswer(activeAnswerName) {
debugger;
        if (activeAnswerName === '') {
          // Every accordion collapsed
          this.answerForm = {
            name: '',
            text: '',
            is_right: false,
          };
        } else {
          const activeAnswerIndex = 0; // TODO findIndex
          this.answerForm = { ...this.selectedQuestionAnswers[activeAnswerName] };
        }
      },
    },
    created() {
      this.selectQuestion(0); // FIXME
    },
    //
  };
</script>
