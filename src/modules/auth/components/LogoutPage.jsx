import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'

export default function LogoutPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  // Execute logout and redirect on mount
  useEffect(() => {
    logout()
    navigate('/login', { replace: true })
  }, [logout, navigate])

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="text-center">
        <p className="text-slate-400">Cerrando sesión...</p>
      </div>
    </div>
  )
}
