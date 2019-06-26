import $ from 'jquery';
import AOS from 'aos';
import 'bootstrap.native';

import '../scss/main.scss';

const showError = () => $('#subscribe-form-modal form').after('<div class="alert alert-danger mt-5 mt-sm-3" role="alert">Please, use correct email.</div>');

const cleanErrors = () => $('.alert.alert-danger').remove();

const showSuccess = (emailField) => {
  $('#subscribe-form-modal form').after('<div class="alert alert-success mt-5 mt-sm-3" role="alert">Form submitted successfully</div>');
  emailField.val('');
  setTimeout(() => {
    $('.alert.alert-success').remove();
    $('#subscribe-form-modal .close').click();
  }, 750);
};

const formValidator = (emailField) => {
  const patternEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  cleanErrors();

  if ((patternEmail.test(emailField.val()))) {
    showSuccess(emailField);
  } else {
    showError();
  }
};

const fixMenuOnScroll = () => {
  const nav = $('#main-menu');
  if ($(document).scrollTop() > $('#header-photos').height()) {
    nav.removeClass('default-menu');
    nav.addClass('scroll-menu');
  } else {
    nav.removeClass('scroll-menu');
    nav.addClass('default-menu');
  }
};

$('document').ready(() => {
  AOS.init({
    easing: 'linear',
    duration: '500',
  });

  $(window).scroll(fixMenuOnScroll);

  $('#subscribe-form-modal button[type=submit]').on('click', () => {
    const emailField = $('#subscribe-form-modal form input[name=email]');
    formValidator(emailField);
  });
});
