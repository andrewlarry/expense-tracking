import React from 'react';
import { Redirect } from 'react-router-dom';

const Report = (props) => {
  if (!props.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return <h1>Report</h1>
};

export default Report;
