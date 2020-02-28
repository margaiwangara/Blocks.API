import { SET_CURRENT_USER } from '../actionTypes';
import { apiService } from '../../services/request';

export default function(path, payload, dispatch) {
  return new Promise((resolve, reject) => {
    return apiService('post', `/api/auth/${path}`, payload)
      .then(({ token, user }) => {
        // store token in localstorage
        localStorage.setItem('token', token);
        // dispatch user
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            user,
          },
        });
        resolve();
      })
      .catch(error => {
        console.log(error);
        reject();
      });
  });
}
