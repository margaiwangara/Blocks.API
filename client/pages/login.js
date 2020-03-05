import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import Layout from '../containers/Layout';
import { AuthContext } from '../context/appContext';

function Login() {
  const router = useRouter();
  const {
    state: {
      authState: { currentUser },
    },
  } = useContext(AuthContext);

  if (currentUser.isAuthenticated) {
    // redirect
    router.push('/');
  }

  return (
    <Layout>
      <AuthForm path="login" btnText="Login" />
    </Layout>
  );
}

export default Login;
