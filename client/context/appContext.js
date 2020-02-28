import { createContext, useReducer } from 'react';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';

export const AuthContext = createContext({});

const initialState = {
  currentUser: {
    isAuthenticated: false,
    user: {},
  },
  error: {},
};

export const AuthProvider = function({ children }) {
  const { currentUser, error } = initialState;

  const [authState, authDispatch] = useReducer(authReducer, { currentUser });
  const [errorState, errorDispatch] = useReducer(errorReducer, { error });

  return (
    <AuthContext.Provider
      value={{
        dispatch: { authDispatch, errorDispatch },
        state: { authState, errorState },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
