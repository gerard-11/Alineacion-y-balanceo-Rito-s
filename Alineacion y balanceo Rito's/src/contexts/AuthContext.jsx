import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../shared/hooks/useLocalStorage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const authStorage = useLocalStorage('authUser')

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = authStorage.get()
    if (storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    authStorage.set(userData)
  }

  const logout = () => {
    setUser(null)
    authStorage.remove()
  }

  const isAuthenticated = !!user

  // Wrap context value in useMemo to prevent unnecessary re-renders
  // of all consumers when parent component re-renders
  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, logout }),
    [user, isAuthenticated, isLoading]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
