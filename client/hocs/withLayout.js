import { AuthProvider } from '../context/appContext';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../containers/Header';

function withLayout(Page) {
  return () => (
    <AuthProvider>
      <GlobalStyle />
      <Header />
      <Container>
        <Page />
      </Container>
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

.error {
  width: 100%;
  padding: 15px;
  text-align: left;
  color: #000;
  background-color: rgba(255, 0, 0, 0.25);
  border-left: solid 3px rgba(255, 0, 0, 0.7);
  border-radius: 10px;
  font-weight: 500;
  letter-spacing: 0.75px;
}

input[type='text'], input[type='email'], input[type='password'] {
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 10px;
  border: solid 1px var(--accent);

  &:focus {
    outline: none;
  }
}

form {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  font-size: 0.9rem;
  input {
    margin-bottom: 10px;
  }

  button {
    background: var(--accent);
    border: solid 2px transparent;
    padding: 10px 5px;
    text-align: center;
    text-transform: uppercase;
    border-radius: 10px;
    color: var(--primary);
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    outline: none;

    &:hover {
      background: var(--primary);
      color: var(--accent);
      border: solid 2px var(--accent);
    }
  }
}
`;

const Container = styled.section`
  width: 90%;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 10px;
  margin: 0 auto;
  display: flex;
`;

export default withLayout;
