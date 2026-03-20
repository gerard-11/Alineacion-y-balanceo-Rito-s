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

  // If SKIP_AUTH is enabled, allow access without authentication
  if (SKIP_AUTH) {
    return children
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
