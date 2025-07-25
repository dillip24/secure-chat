import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';



interface ProtectedRouteProps {
  children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    
    return <Link to="/login" replace state={{ from: location }} />;
  }

  // If authenticated, render the child component
  return <>{children}</>;
};

export default ProtectedRoute;