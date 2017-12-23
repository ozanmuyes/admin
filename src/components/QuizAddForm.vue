<template>
  <el-form
    label-position="top"
    :model="theQuiz"
    ref="form"
    :rules="rules"
    size="small"
  >
    <el-form-item :label="titleCase($t('name'))" prop="name">
      <el-input v-model="theQuiz.name"></el-input>
    </el-form-item>

    <el-form-item :label="titleCase(ct('description'))" prop="description">
      <el-input
        :placeholder="ct('descriptionPlaceholder')"
        :rows="2"
        type="textarea"
        v-model="theQuiz.description"
      ></el-input>
    </el-form-item>

    <el-form-item :label="titleCase(ct('questions'))">
      <question-list-add-form
        ref="questionListAddForm"
        :questions="theQuiz.questions"
      ></question-list-add-form>
    </el-form-item>

    <el-form-item>
      <!-- TODO Translate -->
      <el-tooltip class="item" effect="dark" content="Save quiz with questions and answers." placement="top-start">
        <el-button type="primary" @click="onSubmit">{{ titleCase($t(saveButtonText)) }}</el-button>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="Reset form. This can not be undone." placement="top-start">
        <el-button type="danger" plain @click="onReset">{{ titleCase($t(resetButtonText)) }}</el-button>
      </el-tooltip>
    </el-form-item>
  </el-form>
</template>

<script>
  import { add as addQuiz } from 'api/quizzes';
  import { titleCase as titleCaseFilter } from 'filters';

  import QuestionListAddForm from 'components/QuestionListAddForm';

  const emptyQuiz = {
    // id: -1, // 1,
    // user_id: -1, // 2,
    name: '', // 'quiz1 - quiz for not so dummies',
    description: null, // null,
    // is_enabled: , // true,
    // created_at: '', // '2017-12-17T15:35:09+00:00',
    // modified_at: '', // '2017-12-17T15:35:09+00:00',
    // verified_at: null, // null,
    // deleted_at: null, // null,
    questions: [],
  };

  export default {
    components: {
      QuestionListAddForm,
    },
    props: {
      saveButtonText: {
        type: String,
        default: 'save',
      },
      resetButtonText: {
        type: String,
        default: 'reset',
      },
    },
    data() {
      return {
        theQuiz: emptyQuiz,
        rules: {
          name: [
            { required: true, message: this.$t('forms.rules.required', [this.titleCase(this.$t('name'))]), trigger: 'blur' },
          ],
          description: [
            //
          ],
        },
        //
      };
    },
    methods: {
      // Component Translate
      ct(...params) {
        const tag = params[0];
        params.splice(0, 1);

        return this.$t(`forms.quizAdd.${tag}`, ...params);
      },
      titleCase(text) {
        return titleCaseFilter(text);
      },
      resetForm() {
        this.$refs.form.resetFields();
        this.theQuiz = { ...emptyQuiz };
        this.theQuiz.questions = [];

        this.$refs.questionListAddForm.resetForm(); // TODO Test here
      },
      onSubmit() {
        this.$refs.form.validate((isValid) => {
          if (isValid) {
            // TODO Check if the quiz has any question and \
            //      that question has any answer. If not \
            //      do NOT continue.

            addQuiz(this.theQuiz)
              .then((response) => {
                this.$emit('quizAdded', response);
              })
              .catch((error) => {
                this.$alert(error.response.data.message, 'Error', { type: 'error' }); // TODO translate [TRNSRRRMSG]
              });
          }
        });
      },
      onReset() {
        this.$confirm(
          'Are you sure you want to clear the quiz information? This can not be undone.',
          'Reset Form',
          {
            type: 'alert',
            confirmButtonText: 'Yes',
            confirmButtonClass: 'el-button--danger',
            cancelButtonText: 'No',
          },
        )
          .then((response) => {
            if (response === 'confirm') {
              this.resetForm();
            }
          })
          .catch((error) => {
            if (error !== 'cancel') {
              throw error;
            }
            // Otherwise do nothing since user cancelled
          });
      },
    },
  };
</script>
