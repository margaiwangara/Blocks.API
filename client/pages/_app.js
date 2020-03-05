import App from 'next/app';
import { AuthProvider, AppThemeProvider } from '../context/appContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppThemeProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </AppThemeProvider>
    );
  }
}

export default MyApp;
