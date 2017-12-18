<template>
  <div>
    <el-form-item>
      <el-table
        border
        @current-change="selectedAnswerChanged"
        :data="answers"
        :empty-text="t('no_data')"
        highlight-current-row
        stripe
        style="width: 100%"
      >
        <!-- TODO Translate -->
        <el-table-column type="index" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="ID" width="50"></el-table-column> -->
        <el-table-column prop="text" label="Text" width="260"></el-table-column>
        <!-- FIXME 'is_right' won't render -->
        <!-- <el-table-column prop="is_right" label="Is Right?" :resizable="false"></el-table-column> -->
        <el-table-column label="Is Right?" :resizable="false">
          <template scope="scope">{{ scope.row.is_right }}</template>
          <!-- <span slot-scope="props">{{ props.is_right }}</span> -->
        </el-table-column>

        <el-table-column fixed="right" label="Operations" width="160" :resizable="false">
          <template slot-scope="scope">
            <el-button
              @click="deleteAnswer(scope.$index, scope.row)"
              plain
              size="small"
              type="danger"
            >Delete</el-button>
            <!-- <el-button @click="deleteQuestion(scope.$index, scope.row)" type="text" size="small" :class="$style.deleteQuestionBtn">Delete</el-button> -->
            <!-- <el-button @click="deleteQuestion(scope.$index, scope.row)" type="text" size="small" :class="$style.deleteQuestionBtn">Delete</el-button> -->
          </template>
        </el-table-column>

        <el-table-column align="center" label="" width="95">
          <template slot-scope="scope">
            <svg-icon class='drag-handler' icon-class="drag"></svg-icon>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item label="Update or Add Answer">
      <el-form
        :inline="true"
        :model="selectedAnswer"
        ref="form"
        size="small"
      >
        <el-form-item :label="titleCase(t('text'))">
          <el-input :disabled="disabled" v-model="selectedAnswer.text"></el-input>
        </el-form-item>

        <el-form-item :label="`${titleCase(t('is_right'))}?`">
          <el-switch :disabled="disabled" v-model="selectedAnswer.is_right"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="onUpdate"
            :disabled="disabled || isUpdateBtnDisabled"
            type="primary"
          >Update</el-button>
          <el-button
            @click="onAdd"
            :disabled="disabled || !userCanAddNew"
            plain
            type="success"
          >New</el-button>
        </el-form-item>
      </el-form>
    </el-form-item>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars */

  import SvgIcon from 'components/SvgIcon';

  import { titleCase as titleCaseFilter } from 'filters';

  const emptyAnswer = {
    id: -1,
    // question_id: -1,
    text: '',
    is_right: false,
  };

  export default {
    components: {
      SvgIcon,
    },
    props: {
      answers: {  // an answer --> {
        type: Array,            //   id: -1,
        required: true,         //   // question_id: -1,
      },                        //   text: '',
                                //   is_right: false,
                                // },
      disabled: { // TODO Act upon it
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        selectedAnswer: emptyAnswer,
        // selectedAnswerId: -1,
        selectedAnswerIndex: -1,
        internalDisable: false,
        indexOrderedIds: [
          // e.g. [5,4,7,6] means the question with id of 5 is in the first place
        ],
        userCanAddNew: true,
        //
      };
    },
    computed: {
      isUpdateBtnDisabled() {
        return (this.selectedAnswerIndex === -1);
      },
      isComponentDisabled() {
        return (this.disabled || this.internalDisable);
      },
    },
    methods: {
      t(...params) {
        const tag = params[0];
        params.splice(0, 1);

        return this.$t(`forms.answersListAdd.${tag}`, ...params);
      },
      titleCase(text) {
        return titleCaseFilter(text);
      },
      onUpdate() {
        // FIXME [DNTMTTPRSDT]: Do NOT directly mutate the parent's data
        const updatingAnswer = this.answers[this.selectedAnswerIndex];

        updatingAnswer.text = this.selectedAnswer.text;
        updatingAnswer.is_right = this.selectedAnswer.is_right;
      },
      onAdd() {
        const newAnswer = Object.assign({}, emptyAnswer, {
          text: this.selectedAnswer.text,
          is_right: this.selectedAnswer.is_right,
        });

        // Add to component's related array
        this.answers.push(newAnswer);
        // Emit an event to propagate the change
        this.$emit('onAdd', newAnswer);
      },
      deleteAnswer(index, answer) {
        this.$confirm(
          `Are you sure you want to remove the answer with the text of '${answer.text}'`,
          'Delete Answer',
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
              this.answers.splice(index, 1);

              // Emit an event to propagate the change
              this.$emit('onRemove', answer);
            }
          })
          .catch((error) => {
            if (error !== 'cancel') {
              throw error;
            }
            // Otherwise do nothing since user cancelled
          });
      },
      selectedAnswerChanged(selectedAnswer, oldSelectedAnswer) {
        if (selectedAnswer === null) {
          this.$nextTick(() => {
            if (this.answers.length > 0) {
              this.selectedAnswerChanged(this.answers[0]);
            } else {
              this.selectedAnswer = { ...emptyAnswer };
              this.selectedAnswerIndex = -1;
            }
          });
        } else {
          // // this.selectedAnswerIndex = selectedAnswer.index;
          // this.selectedAnswerId = selectedAnswer.id;
          this.selectedAnswer = { ...selectedAnswer };
          this.selectedAnswerIndex = this.answers.findIndex(
            answer => (answer.text === selectedAnswer.text));
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (this.answers.length > 0) {
          this.selectedAnswerChanged(this.answers[0]);
        }
      });
    },
    watch: {
      // eslint-disable-next-line
      'answers.length'() {
        if (this.answers.length === 0) {
          // Clear the form
          this.selectedAnswer = { ...emptyAnswer };
          this.selectedAnswerIndex = -1;

          this.internalDisable = true;
          this.userCanAddNew = true;
        } else {
          this.internalDisable = false;
          this.userCanAddNew = (this.answers.length < 4);
        }
      },
    },
  };
</script>

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
