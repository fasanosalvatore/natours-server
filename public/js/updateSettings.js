/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
export async function updateData(data, type) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${type === 'data' ? 'updateMe' : 'updateMyPassword'}`,
      data
    });

    showAlert('success', 'Data updated succesfully!');
    return res;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}
