import React from 'react';
import nextCookie from 'next-cookies';
import Layout from '../containers/Layout';
import { withAuthSync } from '../hocs/withAuth';

function Homepage(props) {
  console.log('props', props);
  return (
    <Layout>
      <h1>Hello World</h1>
    </Layout>
  );
}

Homepage.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  console.log(token);
};

export default withAuthSync(Homepage);
