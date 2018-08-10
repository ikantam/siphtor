import React from 'react';
import Sidebar from '../components/security/sidebar';
import Content from '../components/security/content';
import PageWrapper from '../components/common/pageWrapper';

const Security = () => (
  <PageWrapper
    sidebar={<Sidebar />}
    content={<Content />}
  />
);

export default Security;
