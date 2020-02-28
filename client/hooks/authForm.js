import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/appContext';

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

export default function useAuthForm() {
  const [value, setValue] = useState(initialState);
  const { dispatch } = useContext(AuthContext);
  // handlechage
  function handleChange(e) {
    return setValue({ ...value, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // dispatch data acquired
  }
}
