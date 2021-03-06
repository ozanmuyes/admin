export default {
  notValid: 'The form has errors.',
  rules: {
    // common translations for common rules
    required: '{0} is required.',
  },
  userAddit: {
    email: 'e-mail',
    password: 'password',
    're-password': 'password re-enter',
    role: 'role',
    rolePlaceholder: 'Please select a role',
    first_name: 'first name',
    last_name: 'last name',
    username: 'username',
    is_enabled: 'is enabled',
    rules: {
      required: '{0} is required.',
      type: '{0} is wrong.',
      min: '{0} must be minimum {1} characters long.',
      max: '{0} must be maximum {1} characters long.',
      minmax: '{0} must be minimum {1} and maximum {2} characters long.',
      //
    },
    errors: {
      // These are the responses messages from API
    },
  },
  quizAdd: {
    description: 'description',
    descriptionPlaceholder: 'Introduce the quiz to your audience.',
    questions: 'questions',
    rules: {
      //
    },
    //
  },
  questionsListAdd: {
    no_data: 'No Questions',
    time_limit: 'time limit',
    score: 'score',
    text: 'question text',
  },
  answersListAdd: {
    no_data: 'No Answers',
    is_right: 'is right',
    text: 'answer text',
  },
  // auth
  login: {
    title: 'Login',
    email: {
      placeholder: 'E-Mail',
      errors: {
        required: 'E-mail is required.',
        length: 'E-mail length must be between {min} and {max} characters.',
        invalidDomain: 'This domain can not be used.',
      },
    },
    password: {
      // label: 'Password',
      placeholder: 'Password',
      errors: {
        required: 'Password is required.',
        length: 'Password must be greater then {min} characters long.',
      },
    },
    submitButton: 'Login',
    resetButton: 'Reset',
  },
  //
};
