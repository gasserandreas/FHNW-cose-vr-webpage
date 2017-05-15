import React, { PropTypes } from 'react';

import Header from './Header';

const MainView = props => (
  <div>
    <Header navigateToPath={props.navigateToPath} />
    <div className="app-content">
      { props.children }
    </div>
  </div>
);

MainView.propTypes = {
  children: PropTypes.node,
  navigateToPath: PropTypes.func.isRequired,
};


export default MainView;
