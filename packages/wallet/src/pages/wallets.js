import React from 'react';
import Sidebar from '../components/wallets/sidebar';
import Content from '../components/wallets/content';
import PageWrapper from '../components/common/pageWrapper';
import { Redirect } from 'react-router'

class Wallets extends React.Component {
  constructor(props) {
    super(props);

    this.state = { auth: false }
  }

    render() {
      if (!ls.get('auth?')) {
        return <Redirect to='/'/>;
      }
      return (
        <PageWrapper
          sidebar={<Sidebar/>}
          content={<Content/>}
        />
      );
    }
};

export default Wallets;
