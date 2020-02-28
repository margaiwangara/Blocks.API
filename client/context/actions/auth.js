import { SET_CURRENT_USER } from '../actionTypes';
import { apiService } from '../../services/request';
import { addError, removeError } from './error';

export default function(path, payload, dispatch) {
  const { authDispatch, errorDispatch } = dispatch;
  return new Promise((resolve, reject) => {
    return apiService('post', `/api/auth/${path}`, payload)
      .then(({ token, user }) => {
        // store token in localstorage
        localStorage.setItem('token', token);
        // dispatch user
        authDispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            user,
          },
        });
        errorDispatch(removeError());
        resolve();
      })
      .catch(error => {
        errorDispatch(addError(error));
        reject();
      });
  });
}
