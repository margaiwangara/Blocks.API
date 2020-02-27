import { SET_CURRENT_USER } from '../actionTypes';

export default function(state, action) {
  const {
    currentUser: { user },
  } = action.payload;
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          isAuthenticated: !!Object.keys(user).length,
          user: { ...user },
        },
      };
    default:
      return state;
  }
}
