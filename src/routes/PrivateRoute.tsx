// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../modules/auth';  // Adjusted the path to locate the module correctly

interface PrivateRouteProps {
  element: React.ReactElement;
  [key: string]: any;
}

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
  return isAuthenticated() ? element : <Navigate to="/personal-login" />;
};

export default PrivateRoute;
