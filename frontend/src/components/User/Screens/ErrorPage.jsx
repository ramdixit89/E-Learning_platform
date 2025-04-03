import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-4">Oops! Page Not Found</h2>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default ErrorPage;
