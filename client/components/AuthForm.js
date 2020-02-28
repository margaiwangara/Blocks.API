import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/appContext';
import { authFormHook } from '../hooks/forms';

const AuthForm = ({ path: formType, btnText }) => {
  const { value, handleChange, handleSubmit } = authFormHook(formType);
  const {
    state: {
      errorState: { error },
    },
  } = useContext(AuthContext);
  return (
    <FormContainer>
      <Title>{btnText}</Title>
      <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
        {formType == 'register' && (
          <>
            <label htmlFor="nameField">Name</label>
            <input
              type="text"
              name="name"
              id="nameField"
              onChange={handleChange}
              value={value.name}
            />
            <label htmlFor="nameField">Surname</label>
            <input
              type="text"
              name="surname"
              id="surnameField"
              onChange={handleChange}
              value={value.surname}
            />
          </>
        )}
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
        <button type="submit">{btnText}</button>
        {!!Object.keys(error).length && (
          <p className="error">{error.message}</p>
        )}
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Title = styled.h1`
  letter-spacing: 0.75px;
  text-align: center;
  color: var(--accent);
`;
export default AuthForm;
