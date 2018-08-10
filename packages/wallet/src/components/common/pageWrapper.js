import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router'

const pageWrapper = ({ sidebar, content }) => (
  <div className="app_pageBackground_1crd0">
    { (!ls.get('auth?')) ? <Redirect to='/'/> : '' }
    <div className="app_pageWrapper_2GcaG">
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            {sidebar}
          </div>
          <div className="col-xs-8">
            {content}
          </div>
        </div>
      </div>
    </div>
  </div>
);

pageWrapper.propTypes = {
  sidebar: PropTypes.element,
  content: PropTypes.element,
};

export default pageWrapper;
