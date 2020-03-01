import App from 'next/app';
import { AuthProvider } from '../context/appContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
}

export default MyApp;
