import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, auth}:{children:JSX.Element, auth:boolean}) {
  
  if (!auth) {
    return <Navigate to="/personal-login" replace />;
  } 
  
  return children;
}

export default PrivateRoute;


// Chave da API da NOVU(para o envio de notificações)
//b731ea3427c8b71c7d85403799754545
