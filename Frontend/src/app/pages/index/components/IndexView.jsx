import React from 'react';

const IndexView = (props) => {
  console.log('IndexView');
  console.log(props);
  return (
    <div className="container index-view">
      <div className="demo">
        <h1>Welcome COSE</h1>
        <p className="lead">This is currently only some dummy information. This page is currently under construction</p>
      </div>
    </div>
  );
};

export default IndexView;
