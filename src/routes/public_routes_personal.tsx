import { Navigate } from 'react-router-dom';

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