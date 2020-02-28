import { AuthProvider } from '../context/appContext';
import { createGlobalStyle } from 'styled-components';
import Route from '../containers/Route';

function withLayout(Page) {
  return () => (
    <AuthProvider>
      <GlobalStyle />
      <Route />
      <Page />
    </AuthProvider>
  );
}

const GlobalStyle = createGlobalStyle`
body{
  --primary: papayawhip;
  --accent: palevioletred;
  margin: 0;
  padding: 0;
  background: var(--primary);
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}

`;

export default withLayout;
