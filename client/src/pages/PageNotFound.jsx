import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h1>PageNotFound :/</h1>
      <h3>
        <Link to="/">Go to the home page</Link>
      </h3>
    </div>
  );
};

export default PageNotFound;
