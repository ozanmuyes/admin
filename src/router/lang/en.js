/**
 * Export these key/value pairs to them to be
 * injected to language entry's root. That
 * is the entries of the `asRoot` are un-
 * related with any route directly.
 * Please note the they can be overriden by
 * other router language files. Also they
 * may override final language entry.
 */
const asRoot = {
  'N/A': 'N/A',
  dashboard: 'Dashboard',
};

// TODO 'const router = {' and 'login' & 'admin'... in it.
// Namespace the language exports
const router = {
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
};

export default { ...asRoot, router };
