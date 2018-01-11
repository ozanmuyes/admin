export default {
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
  admin: {
    users: {
      _: 'Users',
      index: 'View Users',
      add: 'Add User',
    },
    quizzes: {
      _: 'Quizzes',
      index: 'View Quizzes',
      add: 'Add Quiz',
    },
    //
  },
  set_password: {
    title: 'Set Your Password',
    //
  },
};
