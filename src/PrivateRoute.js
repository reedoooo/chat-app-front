// PrivateRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/hooks/user';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return user ? children : <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;
