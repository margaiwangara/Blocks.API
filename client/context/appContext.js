import { createContext, useReducer } from 'react';
import authReducer from './reducers/authReducer';

export const AuthContext = createContext({});

const initialState = {
  currentUser: {
    isAuthenticated: false,
    user: {},
  },
  error: {},
};

export const AuthProvider = function({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ dispatch, state }}>
      {children}
    </AuthContext.Provider>
  );
};
