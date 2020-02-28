import React from 'react';
import AuthForm from '../components/AuthForm';
import withLayout from '../hocs/withLayout';

function Register() {
  return <AuthForm path="register" btnText="Register" />;
}

export default withLayout(Register);
