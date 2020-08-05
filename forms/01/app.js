const App = {
  $firstName: $('#first_name'),
  $lastName: $('#last_name'),
  $email: $('#email'),
  $password: $('#password'),
  $phone: $('#phone'),

  displayRequiredError: function(field) {
    let text = $(`label[for='${field.attr('id')}']`).text();
    field.addClass('invalid_field');
    field.next('span').text(`${text} is a required field.`);
  },

  displayValidEmailError: function() {
    this.$email.addClass('invalid_field');
    this.$email.next('span').text('Please Enter a valid Email.');
  },

  displayValidPasswordError: function() {
    this.$password.addClass('invalid_field');
    this.$password.next('span').text('Password must be at least 10 characters long.');
  },

  displayValidPhoneError: function() {
    this.$phone.addClass('invalid_field');
    this.$phone.next('span').text('Please Enter a valid Phone Number.');
  },

  clearError: function(event) {
    $(event.target).removeClass('invalid_field');
    $(event.target).next('span').text('');
  },

  handleNameBlur: function(event) {
    let name = event.target.value;

    if (!event.target.checkValidity()) {
      this.displayRequiredError($(event.target));
    }
  },

  handleEmailBlur: function(event) {
    if (event.target.validity.valueMissing) {
      this.displayRequiredError($(event.target));
    } else if (!event.target.checkValidity()) {
      this.displayValidEmailError();
    }
  },

  handlePasswordBlur: function(event) {
    if (event.target.validity.valueMissing) {
      this.displayRequiredError($(event.target));
    } else if (!event.target.checkValidity()) {
      this.displayValidPasswordError();
    }
  },

  handlePhoneBlur: function(event) {
    if (!event.target.checkValidity()) {
      this.displayValidPhoneError();
    }
  },

  handleFormSubmit: function(event) {
    event.preventDefault();

    const $fields = $('input');
    const valid = $fields.filter(function() {
                    return !this.checkValidity();
                  }).length === 0;

    if (!valid) {
      $('input').trigger('blur');
      $('p.form_errors').text('Form cannot be submitted until errors are corrected.');
    } else {
      $('p.form_errors').text('');
    }
  },

  init: function() {
    this.$firstName.on('blur', this.handleNameBlur.bind(this));
    this.$lastName.on('blur', this.handleNameBlur.bind(this));
    this.$email.on('blur', this.handleEmailBlur.bind(this));
    this.$password.on('blur', this.handlePasswordBlur.bind(this));
    this.$phone.on('blur', this.handlePhoneBlur.bind(this));
    $('form').find('input').on('focus', this.clearError.bind(this));
    $('form').on('submit', this.handleFormSubmit.bind(this));
  }
};

App.init();
