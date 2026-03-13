import { useState, useEffect } from 'react'
import { apiClient } from '../api/client'

export function useBalanceo() {
  const [servicios, setServicios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServicios = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.balanceo.getAll()
      setServicios(response.data || [])
    } catch (err) {
      setError(err.message || 'Error al cargar servicios de balanceo')
      setServicios([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServicios()
  }, [])

  return { servicios, loading, error, refetch: fetchServicios }
}
