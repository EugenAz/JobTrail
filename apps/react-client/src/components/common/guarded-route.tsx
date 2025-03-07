import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../../utils/auth.context';

export const GuardedRoute = () => {
  const { authToken } = useAuth();
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};
