import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function AdminRoute({ children }) {
  const { lng } = useParams();
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={`/${lng}/`} />
  }

  return children
}
