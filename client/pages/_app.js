import App from 'next/app';
import { AuthProvider, AppThemeProvider } from '../context/appContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <AppThemeProvider>
          <Component {...pageProps} />
        </AppThemeProvider>
      </AuthProvider>
    );
  }
}

export default MyApp;
