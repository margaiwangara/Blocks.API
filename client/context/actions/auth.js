import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actionTypes';
import { apiService } from '../../services/request';
import { addError, removeError } from './error';
import cookie from 'js-cookie';

export const setCurrentUser = function(path, payload, dispatch) {
  const { authDispatch, errorDispatch } = dispatch;
  return new Promise((resolve, reject) => {
    return apiService('post', `/api/auth/${path}`, payload)
      .then(({ token, user }) => {
        // store token in localstorage
        window.localStorage.setItem('token', token);
        cookie.set('token', token, { expires: 30 });
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
};

export const removeCurrentUser = function(dispatch) {
  // remove cookie
  cookie.remove('token');
  window.localStorage.removeItem('token');
  window.localStorage.setItem('logout', Date.now());
  // dispatch logout
  return dispatch({
    type: REMOVE_CURRENT_USER,
  });
};
