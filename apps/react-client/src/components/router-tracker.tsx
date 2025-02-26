import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { LAST_VISITED_ROUTE_KEY } from '../utils/constants';

export const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login') {
      localStorage.setItem(LAST_VISITED_ROUTE_KEY, location.pathname);
    }
  }, [location.pathname]);

  return null;
};
