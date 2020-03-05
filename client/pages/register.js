import React, { useContext } from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../containers/Layout';
import { AuthContext } from '../context/appContext';

function Register() {
  return (
    <Layout>
      <AuthForm path="register" btnText="Register" />
    </Layout>
  );
}

export default Register;
