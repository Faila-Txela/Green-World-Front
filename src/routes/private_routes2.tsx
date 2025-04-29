import { Navigate } from 'react-router-dom';
import { useAuth } from './auth_context';
import { useEffect, useRef } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const data = localStorage.getItem("empresa")
  
  // Volta para a página de login se não houver um usuário autenticado
  if (!data) {
    return <Navigate to="/enterprise-login" replace />;
  }

  return children;
}

export default PrivateRoute;