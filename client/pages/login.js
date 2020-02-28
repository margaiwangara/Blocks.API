import React from 'react';
import AuthForm from '../components/AuthForm';
import withLayout from '../hocs/withLayout';

function Login() {
  return <AuthForm path="login" btnText="Login" />;
}

export default withLayout(Login);
