export default {
  save: 'save',
  reset: 'reset',
  cancel: 'cancel',
  error: 'error',
  update: 'update',
  forms: {
    notValid: 'The form has errors.',
    userAdd: {
      email: 'e-mail',
      password: 'password',
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
    //
  },
};
