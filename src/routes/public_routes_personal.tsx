import { Navigate } from 'react-router-dom';
import { useAuth } from './auth_context';
import { useEffect, useRef } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PublicRoutesPersonal({ children }: PrivateRouteProps) {
  const data = localStorage.getItem("user")
  // Verifica se não há um usuário autenticado
  if (data) {
    return <Navigate to="/personal-dashboard" replace />;
  }

  return children;
}