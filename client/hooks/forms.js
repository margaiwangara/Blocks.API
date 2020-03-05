import { useState, useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from '../context/appContext';
import { setCurrentUser } from '../context/actions/auth';

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

export const useAuthForm = function(path) {
  const [value, setValue] = useState(initialState);
  const { dispatch } = useContext(AuthContext);
  // handlechage
  function handleChange(e) {
    return setValue({ ...value, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // dispatch data acquired
    setCurrentUser(path, value, dispatch)
      .then(() => Router.push('/'))
      .catch(error => console.log(error));
  }

  return {
    value,
    handleChange,
    handleSubmit,
  };
};
