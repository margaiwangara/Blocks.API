import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/appContext';
import authAction from '../context/actions/auth';

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

export const authFormHook = function useAuthForm(path) {
  const router = useRouter();
  const [value, setValue] = useState(initialState);
  const { dispatch } = useContext(AuthContext);
  // handlechage
  function handleChange(e) {
    return setValue({ ...value, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // dispatch data acquired
    authAction(path, value, dispatch)
      .then(() => console.log('Logged In'))
      .catch(error => console.log(error));
  }

  return {
    value,
    handleChange,
    handleSubmit,
  };
};
