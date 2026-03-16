import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import { ErrorAlert } from '@shared/components'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validación básica
    if (!email || !password) {
      setError('Por favor completa todos los campos')
      setIsLoading(false)
      return
    }

    try {
      // TODO: Reemplazar con tu lógica de autenticación real
      // Ejemplo: hacer una llamada a tu API
      // const response = await authService.login({ email, password })

      // Por ahora, simulamos una autenticación exitosa
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
      }

      login(userData)
      navigate('/ventas', { replace: true })
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-indigo-500 text-4xl">◆</span>
          </div>
          <h1 className="text-white text-2xl font-bold">RITO'S</h1>
          <p className="text-slate-400 text-sm">Alineación y Balanceo</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-xl">
          <h2 className="text-white text-xl font-bold mb-6">Iniciar sesión</h2>

          {error && <ErrorAlert message={error} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@example.com"
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Development Notice */}
          {import.meta.env.VITE_SKIP_AUTH === 'true' && (
            <div className="mt-6 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-yellow-600 text-xs">
                ⚠️ Modo desarrollo: autenticación deshabilitada
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
