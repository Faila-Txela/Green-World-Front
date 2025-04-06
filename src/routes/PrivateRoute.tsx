import { Navigate } from 'react-router-dom';
import Login from '../pages/user-personal/PersoanlLogin';

function PrivateRoute({ children, auth}:{children:JSX.Element, auth:boolean}) {
  
  if (!auth) {
    return <Navigate to="/personal-login" replace />;
  } 
  
  return children;
}

export default PrivateRoute;
