import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import withLayout from '../hocs/withLayout';
import { AuthContext } from '../context/appContext';

function Register() {
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

  return <AuthForm path="register" btnText="Register" />;
}

export default Register;
