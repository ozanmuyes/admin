<template>
  <el-collapse
    accordion
  >
    <el-collapse-item v-for="(answer, index) in answers"
      :key="index"
      :name="index"
      :title="answer.text"
    >
      <div :class="$style.answerFormContainer">
        <el-form
          :model="forms[index]"
          size="mini"
        >
          <el-form-item label="Text">
            <el-input v-model="forms[index].text"></el-input>
          </el-form-item>

          <el-form-item label="Is Right?">
            <el-switch v-model="forms[index].is_right"></el-switch>
          </el-form-item>

          <!-- <el-form-item>
            <el-button type="primary">Save</el-button>
            <el-button type="danger" plain @click="discardChanges">Discard</el-button>
          </el-form-item> -->
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  export default {
    props: {
      answers: {
        type: Array,
        required: true,
      },
    },
    // TODO On change of unsaved - show prompt
    data() {
      return {
        forms: [
          {
            name: '',
            text: '',
            is_right: false,
          },
        ],
        //
      };
    },
//     methods: {
//       onAccordionChange(id) {
// console.log(`acc. change: ${id}`);
//         if (id === '') {
//           // Every collapsable is collapsed
//           //
//         } else {
//           // TODO Save the current form entries
//           // TODO If 'is_right' is true, make false others'

//           // Reset the form
//           this.form = {
//             name: '',
//             text: '',
//             is_right: false,
//           };
//           // Wait for the accordion transition to finish
//           setTimeout(() => {
//             this.form = this.answers[+id];
//           }, 300);
//         }
//       },
//     },
    created() {
      this.forms = [];

      this.answers.forEach((answer) => {
        this.forms.push(answer);
      });
    },
    watch: {
      answers() {
        this.forms = [];

        this.answers.forEach((answer) => {
          this.forms.push(answer);
        });
      },
    },
    //
  };
</script>

<style module>
  .answerFormContainer {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
