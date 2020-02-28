import { AuthProvider } from '../context/appContext';
import { createGlobalStyle } from 'styled-components';
import Header from '../containers/Header';

function withLayout(Page) {
  return () => (
    <AuthProvider>
      <GlobalStyle />
      <Header />
      <Page />
    </AuthProvider>
  );
}

const GlobalStyle = createGlobalStyle`
body {
  --primary: papayawhip;
  --accent: palevioletred;
  margin: 0;
  padding: 0;
  background: var(--primary);
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  text-decoration: none;
  cursor: pointer;
}

`;

export default withLayout;
