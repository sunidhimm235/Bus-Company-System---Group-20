import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation(); 

  console.log('AdminRoute user:', user);

  const userHasRequiredRole = user && allowedRoles.includes(user.role);

  return userHasRequiredRole ? (
    <Component {...rest} /> 
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default AdminRoute;