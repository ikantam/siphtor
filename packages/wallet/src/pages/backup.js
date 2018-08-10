import React from 'react';
import Sidebar from '../components/backup/sidebar';
import Content from '../components/backup/content';
import PageWrapper from '../components/common/pageWrapper';

const Backup = () => (
  <PageWrapper
    sidebar={<Sidebar/>}
    content={<Content/>}
  />
);

export default Backup;
