import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actionTypes';

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
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          isAuthenticated: false,
          user: {},
        },
      };
    default:
      return state;
  }
}
