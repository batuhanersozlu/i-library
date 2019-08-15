import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-wrapper">
      <h1>404</h1>
        <h3>Knowledge not found :(</h3>
        <h4>Come Back Later</h4>
        <br/>
        <Link to="/">Back To Home</Link>
    </div>
  )
}

export default ErrorPage;