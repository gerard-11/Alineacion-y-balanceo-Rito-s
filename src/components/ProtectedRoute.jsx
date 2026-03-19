import { Navigate } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import { LoadingSpinner } from '@shared/components'

const SKIP_AUTH = import.meta.env.VITE_SKIP_AUTH === 'true'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  // Si SKIP_AUTH está habilitado, permitir acceso sin autenticación
  if (SKIP_AUTH) {
    return children
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
