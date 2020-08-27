/*eslint-disable*/
import '@babel/polyfill';

import { login, logout, signup } from './auth';
import { updateData } from './updateSettings';
import { displayMap } from './mapbox';
import { showAlert } from './alert';

const logOutBtn = document.querySelector('.nav__el.nav__el--logout');

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (document.getElementById('map')) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}

if (document.querySelector('#login .form'))
  document.querySelector('#login .form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (document.querySelector('#signup .form'))
  document.querySelector('#signup .form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    signup(
      document.querySelector('#signup .form'),
      name,
      email,
      phone,
      password,
      confirmPassword
    );
  });

if (document.querySelector('.form.form-user-data'))
  document
    .querySelector('.form.form-user-data')
    .addEventListener('submit', async e => {
      e.preventDefault();
      const form = new FormData();
      form.append('name', document.getElementById('name').value);
      form.append('email', document.getElementById('email').value);
      form.append('photo', document.getElementById('photo').files[0]);
      const res = await updateData(form, 'data');
      document.querySelector('.form__user-photo').src = `img/users/${
        res.data.data.user.photo
      }`;
      document.querySelector('.nav__user-img').src = `img/users/${
        res.data.data.user.photo
      }`;
    });

if (document.querySelector('.form.form-user-settings'))
  document
    .querySelector('.form.form-user-settings')
    .addEventListener('submit', async e => {
      e.preventDefault();
      document.querySelector('.btn--save-password').textContent = 'Updating...';
      const passwordCurrent = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      await updateData(
        { passwordCurrent, password, passwordConfirm },
        'password'
      );

      document.getElementById('password-current').value = '';
      document.getElementById('password').value = '';
      document.getElementById('password-confirm').value = '';
      document.querySelector('.btn--save-password').textContent =
        'Save password';
    });

if (document.getElementById('book-tour')) {
  const { bookTour } = require('./stripePayments');
  document.getElementById('book-tour').addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

if (document.querySelector('body').dataset.alert)
  showAlert('success', document.querySelector('body').dataset.alert, 12);
