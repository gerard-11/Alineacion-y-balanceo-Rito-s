import { useState, useEffect } from 'react'
import { apiClient } from '../api/client'

export function useVentas() {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchVentas = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.ventas.getAll()
      setVentas(response.data || [])
    } catch (err) {
      setError(err.message || 'Error al cargar ventas')
      setVentas([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVentas()
  }, [])

  return { ventas, loading, error, refetch: fetchVentas }
}
