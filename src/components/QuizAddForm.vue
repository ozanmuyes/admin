<template>
  <el-form
    label-position="top"
    :model="theQuiz"
    ref="form"
    :rules="rules"
    size="small"
  >
    <el-form-item :label="titleCase($t('name'))">
      <el-input v-model="theQuiz.name"></el-input>
    </el-form-item>

    <el-form-item :label="titleCase(t('description'))">
      <el-input
        :placeholder="t('descriptionPlaceholder')"
        :rows="2"
        type="textarea"
        v-model="theQuiz.description"
      ></el-input>
    </el-form-item>

    <el-form-item :label="titleCase(t('questions'))">
      <question-list-add-form :questions="theQuiz.questions"></question-list-add-form>
    </el-form-item>

    <el-form-item>
      <!-- TODO Translate -->
      <el-tooltip class="item" effect="dark" content="Save quiz with questions and answers." placement="top-start">
        <el-button type="primary" @click="onSubmit">{{ titleCase($t(saveButtonText)) }}</el-button>
      </el-tooltip>

      <!-- TODO <el-tooltip class="item" effect="dark" content="Top Left prompts info" placement="top-start"> -->
      <el-button type="danger" plain @click="onReset">{{ titleCase($t(resetButtonText)) }}</el-button>
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
          // TODO
        },
        //
      };
    },
    methods: {
      t(...params) {
        const tag = params[0];
        params.splice(0, 1);

        return this.$t(`forms.quizAdd.${tag}`, ...params);
      },
      titleCase(text) {
        return titleCaseFilter(text);
      },
      resetForm() {
        this.$refs.form.resetFields();
        this.user = { ...emptyQuiz };
      },
      onSubmit() {
        // NOTE this.$refs.form.validate((isValid) => {

        // TODO THE BIG ONE
        addQuiz(this.theQuiz)
          .then((response) => {
            //
console.log(response, this.theQuiz);
// debugger;
            this.$emit('quizAdded');
          })
          .catch((error) => { // eslint-disable-line
            // TODO
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
              // TODO Test here
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
