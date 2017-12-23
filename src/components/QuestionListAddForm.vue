<template>
  <div>
    <el-form-item>
      <el-table
        border
        @current-change="selectedQuestionChanged"
        :data="questions"
        :empty-text="t('no_data')"
        highlight-current-row
        stripe
        style="width: 100%"
      >
        <!-- TODO Translate -->
        <el-table-column type="index" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="ID" width="50"></el-table-column> -->
        <el-table-column prop="text" label="Text" width="260"></el-table-column>
        <el-table-column prop="time_limit" label="Time Limit" width="100"></el-table-column>
        <el-table-column prop="score" label="Score" :resizable="false"></el-table-column>

        <el-table-column fixed="right" label="Operations" width="160" :resizable="false">
          <template slot-scope="scope">
            <el-button
              @click="removeQuestion(scope.$index, scope.row)"
              plain
              size="small"
              type="danger"
            >Delete</el-button>
            <!-- <el-button @click="removeQuestion(scope.$index, scope.row)" type="text" size="small" :class="$style.removeQuestionBtn">Delete</el-button> -->
            <!-- <el-button @click="removeQuestion(scope.$index, scope.row)" type="text" size="small" :class="$style.removeQuestionBtn">Delete</el-button> -->
          </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="" width="95">
          <template slot-scope="scope">
            <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
          </template>
        </el-table-column> -->
      </el-table>
    </el-form-item>

    <el-form-item label="Update or Add Question">
      <el-form
        :inline="true"
        :model="selectedQuestion"
        ref="form"
        size="small"
      >
        <el-form-item :label="titleCase(t('text'))">
          <el-input v-model="selectedQuestion.text" required></el-input>
        </el-form-item>

        <el-form-item :label="titleCase(t('time_limit'))">
          <el-input-number
            :disabled="isUpdateBtnDisabled && isNewBtnDisabled"
            :min="0"
            :max="600"
            :step="5"
            v-model="selectedQuestion.time_limit"
          ></el-input-number>
        </el-form-item>

        <el-form-item :label="titleCase(t('score'))">
          <el-input-number
            :disabled="isUpdateBtnDisabled && isNewBtnDisabled"
            :min="0"
            :max="1000"
            :step="10"
            v-model="selectedQuestion.score"
          ></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="onUpdate"
            :disabled="isUpdateBtnDisabled"
            type="primary"
          >Update</el-button>
          <el-button
            @click="onAdd"
            :disabled="isNewBtnDisabled"
            plain
            type="success"
          >New</el-button>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="Answers">
      <answers-list-add-form
        :answers="selectedQuestionAnswers"
        :disabled="isAnswersComponentDisabled"
        ref="answersListAddForm"
      ></answers-list-add-form>
    </el-form-item>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */

  // import Sortable from 'sortablejs';

  import SvgIcon from 'components/SvgIcon';
  import AnswersListAddForm from 'components/AnswersListAddForm';

  import { titleCase as titleCaseFilter } from 'filters';

  const emptyQuestion = {
    id: -1,
    // quiz_id: -1,
    text: '',
    time_limit: 0,
    score: 0,
    answers: [],
  };

  export default {
    components: {
      SvgIcon,
      AnswersListAddForm,
    },
    props: {
      questions: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        selectedQuestion: emptyQuestion,
        // questions: [ // FIXME When the list is empty warnings arises...
        //   { // for development purposes
        //     id: 1,
        //     text: 'what is this?',
        //     time_limit: 60,
        //     score: 1000,
        //     answers: [
        //       { id: 1, text: 'pencil', is_right: false },
        //       { id: 2, text: 'super-man', is_right: false },
        //       { id: 3, text: '42', is_right: false },
        //       { id: 4, text: '', is_right: true },
        //     ],
        //   },
        //   { // for development purposes
        //     id: 2,
        //     text: 'what wasn\'t that?',
        //     time_limit: 60,
        //     score: 1000,
        //     answers: [
        //       { id: 1, text: 'answer', is_right: false },
        //       { id: 2, text: 'pencil', is_right: true },
        //       { id: 3, text: 'wonder woman', is_right: false },
        //       { id: 4, text: '', is_right: true },
        //     ],
        //   },
        // ],
        selectedQuestionIndex: -1,
        //
      };
    },
    computed: {
      isUpdateBtnDisabled() {
        return (this.selectedQuestionIndex === -1);
      },
      isNewBtnDisabled() {
        return (this.selectedQuestion.text === '');
      },
      isAnswersComponentDisabled() {
        return (this.selectedQuestionIndex === -1);
      },
      selectedQuestionAnswers() {
        if (this.selectedQuestionIndex === -1) {
          return [];
        }

        return this.questions[this.selectedQuestionIndex].answers;
      },
    },
    methods: {
      t(...params) {
        const tag = params[0];
        params.splice(0, 1);

        return this.$t(`forms.questionsListAdd.${tag}`, ...params);
      },
      titleCase(text) {
        return titleCaseFilter(text);
      },
      resetForm() {
        this.$refs.form.resetFields();

        this.$refs.answersListAddForm.resetForm();
      },
      onUpdate() {
        // FIXME [DNTMTTPRSDT]: Do NOT directly mutate the parent's data
        const updatingQuestion = this.questions[this.selectedQuestionIndex];

        updatingQuestion.text = this.selectedQuestion.text;
        updatingQuestion.time_limit = this.selectedQuestion.time_limit;
        updatingQuestion.score = this.selectedQuestion.score;
      },
      onAdd() {
        // const newQuestion = Object.assign({}, emptyQuestion, {
        //   text: this.selectedQuestion.text,
        //   time_limit: this.selectedQuestion.time_limit,
        //   score: this.selectedQuestion.score,
        // });
        const newQuestion = {
          text: this.selectedQuestion.text,
          time_limit: this.selectedQuestion.time_limit,
          score: this.selectedQuestion.score,
          answers: [],
        };

        // Add to component's related array
        // FIXME [DNTMTTPRSDT]
        this.questions.push(newQuestion);
        // Emit an event to propagate the change
        this.$emit('onAdd', newQuestion);
      },
      removeQuestion(index, question) {
        this.$confirm(
          `Are you sure you want to remove the question with the text of '${question.text}'`,
          'Delete Question',
          {
            type: 'warning',
            confirmButtonText: 'Yes',
            confirmButtonClass: 'el-button--danger',
            cancelButtonText: 'No',
          },
        )
          .then((response) => {
            if (response === 'confirm') {
              // Remove from component's related array
              // FIXME [DNTMTTPRSDT]
              this.questions.splice(index, 1);

              // Emit an event to propagate the change
              this.$emit('onRemove', question);
            }
          })
          .catch((error) => {
            if (error !== 'cancel') {
              throw error;
            }
            // Otherwise do nothing since user cancelled
          });
      },
      selectedQuestionChanged(selectedQuestion, oldSelectedQuestion) {
        if (selectedQuestion === null) {
          // Unselected - no rows exists

          this.selectedQuestion = { ...emptyQuestion };
          this.selectedQuestionIndex = -1;
        } else {
          this.selectedQuestion = { ...selectedQuestion };
          this.selectedQuestionIndex = this.questions.findIndex(
            question => (question.text === selectedQuestion.text));
        }
      },
    },
    mounted() {
      if (this.questions.length > 0) {
        this.selectedQuestionChanged(this.questions[0]);
      }
    },
    watch: {
      // eslint-disable-next-line
      'questions.length'() {
        if (this.questions.length === 0) {
          // Clear the form
          this.selectedQuestion = { ...emptyQuestion };
          this.selectedQuestionIndex = -1;
        }
      },
    },
  };
</script>

<style module>
  .removeQuestionBtn {
    color: red;
  }
  .removeQuestionBtn:hover {
    color: maroon;
  }
</style>

<style scoped>
  .drag-handler{
    width: 30px;
    height: 30px;
    cursor: move;
  }
  .show-d{
    margin-top: 15px;
  }
</style>
