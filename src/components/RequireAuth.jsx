import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuthenticated, location, navigate]);

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return children;
};

export default RequireAuth;
