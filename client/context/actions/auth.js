import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actionTypes';
import { apiService, setTokenHeader } from '../../services/request';
import { addError, removeError } from './error';
import cookie from 'js-cookie';

export const passCurrentUser = user => ({
  type: SET_CURRENT_USER,
  currentUser: {
    user,
  },
});

export const setAuthorizationToken = token => setTokenHeader(token);

export const setCurrentUser = function(path, payload, dispatch) {
  const { authDispatch, errorDispatch } = dispatch;
  return new Promise((resolve, reject) => {
    return apiService('post', `/api/auth/${path}`, payload)
      .then(({ token, user }) => {
        // store token in localstorage
        window.localStorage.setItem('token', token);
        cookie.set('token', token, { expires: 30 });
        setAuthorizationToken(token);
        // dispatch user
        authDispatch(passCurrentUser(user));
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
  window.localStorage.clear();
  window.localStorage.setItem('logout', Date.now());
  // dispatch logout
  passCurrentUser({});
  dispatch({
    type: REMOVE_CURRENT_USER,
  });
  return;
};
