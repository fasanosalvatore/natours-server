/*eslint-disable*/
import axios from 'axios';

import { showAlert } from './alert';
export async function signup(
  form,
  name,
  email,
  phone,
  password,
  passwordConfirm
) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        phone,
        password,
        passwordConfirm
      }
    });

    showAlert('success', 'Check your email to confirm tour accout!');
    const markup = `<div class="form"><div class="form__group">
        <label for="totpToken" class="form__label">Codice Verifica SMS</label>
        <input type="numeric" id="totpToken" class="form__input" />
      </div>
      <div class="form__group">
        <button id="totp" class="btn btn--green">Conferma</button>
      </div></div>`;
    form.insertAdjacentHTML('beforebegin', markup);
    form.remove();
    document.querySelector('#totp').addEventListener('click', e => {
      e.preventDefault();
      const totpToken = document.querySelector('#totpToken').value;
      console.log(totpToken);
      confirmNumber(totpToken);
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export async function confirmNumber(totpToken) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/confirmNumber',
      data: {
        totpToken
      }
    });
    showAlert('success', 'Your number is corrected confirmed!');
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export async function login(email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    showAlert('success', 'Logged in succesfully');
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export async function logout() {
  try {
    const res = await axios.get('/api/v1/users/logout');
    if (res.data.status === 'success') location.assign('/');
  } catch (err) {
    showAlert('error', 'Error logging out, try again!');
  }
}
