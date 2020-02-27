import { createContext, useReducer } from 'react';

export const AuthContext = createContext({});

const initialState = {
  currentUser: {
    isAuthenticated: false,
    user: {},
  },
  errors: {},
};

export const AuthProvider = function({ children }) {
  const [dispatch, state] = useReducer(authReducer, initialState);

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
