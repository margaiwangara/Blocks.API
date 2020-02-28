import React, { useState } from 'react';
import { AuthProvider } from '../context/appContext';
import AuthForm from '../components/AuthForm';

function Register() {
  return (
    <AuthProvider>
      <AuthForm path="register" btnText="Register" />
    </AuthProvider>
  );
}

export default Register;
