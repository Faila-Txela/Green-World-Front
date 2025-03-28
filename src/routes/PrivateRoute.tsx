import Login from '../pages/user-personal/PersoanlLogin';

function PrivateRoute({ children, auth}:{children:JSX.Element, auth:boolean}) {
  
  if (!auth) {
    return <Login />;
  } 
  
  return children;
}

export default PrivateRoute;
