import React from 'react';
import Sidebar from '../components/privateKeys/sidebar';
import Content from '../components/privateKeys/content';
import PageWrapper from '../components/common/pageWrapper';

const PrivateKeys = () => (
  <PageWrapper
    sidebar={<Sidebar />}
    content={<Content />}
  />
);

export default PrivateKeys;
