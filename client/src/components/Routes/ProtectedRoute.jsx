import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const { lng } = useParams();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/${lng}/login`} />
  }

  return children
}

