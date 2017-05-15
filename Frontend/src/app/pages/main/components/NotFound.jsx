import React, { Component } from 'react';
import { browserHistory } from 'react-router';

const NotFound = () => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  return (
    <div className="not-found">
      <h1>Not found</h1>
      <h2>No route for <code>{pathname}</code></h2>
    </div>
  );
}

export default NotFound;
