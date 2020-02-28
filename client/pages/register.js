import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Register() {
  const [value, setValue] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  function handleChange(e) {
    return setValue({ ...value, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/auth/register', value)
      .then(({ data }) => console.log(data))
      .catch(error => console.log(error.response.data.error.message));
  }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <label htmlFor="nameField">Name</label>
      <input
        type="text"
        name="name"
        id="nameField"
        onChange={handleChange}
        value={value.name}
      />
      <label htmlFor="surnameField">Surname</label>
      <input
        type="text"
        name="surname"
        id="surnameField"
        onChange={handleChange}
        value={value.surname}
      />
      <label htmlFor="emailField">Email</label>
      <input
        type="email"
        name="email"
        id="emailField"
        onChange={handleChange}
        value={value.email}
      />
      <label htmlFor="passwordField">Password</label>
      <input
        type="password"
        name="password"
        id="passwordField"
        onChange={handleChange}
        value={value.password}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
