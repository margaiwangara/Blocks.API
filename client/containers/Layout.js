import React from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Blocks | Real Estate Stuff</title>
      </Head>
      <GlobalStyle />
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
body {
  --primary: ${({ theme }) => theme.colors.primary};
  --accent: ${({ theme }) => theme.colors.accent};
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

.nav-link{
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.9;
}

.navbar-brand {
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.9;
  font-size: 1.2rem;
}


.error {
  padding: 15px;
  text-align: left;
  color: #000;
  background-color: rgba(255, 0, 0, 0.25);
  border-left: solid 3px rgba(255, 0, 0, 0.7);
  border-radius: 10px;
  font-weight: 500;
  letter-spacing: 0.5px;
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
  max-width: 65rem;
  margin: 1.5rem auto;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
`;

export default Layout;
