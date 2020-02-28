import { SET_CURRENT_USER } from '../actionTypes';

export default function(state, action) {
  const { user } = action.currentUser;
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          isAuthenticated: !!Object.keys(user).length,
          user,
        },
      };
    default:
      return state;
  }
}
