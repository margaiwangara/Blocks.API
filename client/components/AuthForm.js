import React from 'react';

const AuthForm = ({ path: formType, btnText }) => {
  return (
    <form method="POST" autoComplete="off">
      {formType == 'signup' && (
        <>
          <label htmlFor="nameField">Name</label>
          <input type="text" name="name" id="nameField" />
          <label htmlFor="nameField">Surname</label>
          <input type="text" name="surname" id="surnameField" />
        </>
      )}
      <label htmlFor="emailField">Email</label>
      <input type="email" name="email" id="emailField" />
      <label htmlFor="passwordField">Password</label>
      <input type="password" name="password" id="passwordField" />
      <button type="submit">{btnText}</button>
    </form>
  );
};

export default AuthForm;
