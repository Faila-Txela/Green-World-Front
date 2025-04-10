import { Navigate } from 'react-router-dom';
import { useAuth } from './auth_context';
import { useEffect, useRef } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
}

function PublicRoutesEnterprise({ children }: PrivateRouteProps) {
  const authRef = useRef<boolean>(false)
  useEffect(()=>{
    const data = localStorage.getItem("user")
    if (data) {
      authRef.current = true
    }
  }, [])
  // Verifica se não há um usuário autenticado
  if (authRef) {
    return <Navigate to="/enterprise-dashboard" replace />;
  }

  return children;
}

export default PublicRoutesEnterprise;



// Chave da API da NOVU(para o envio de notificações)
//b731ea3427c8b71c7d85403799754545