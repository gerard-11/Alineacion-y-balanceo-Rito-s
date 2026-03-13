import { useState, useEffect } from 'react'
import { apiClient } from '../api/client'

export function useLlantas() {
  const [llantas, setLlantas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchLlantas = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.llantas.getAll()
      setLlantas(response.data || [])
    } catch (err) {
      setError(err.message || 'Error al cargar llantas')
      setLlantas([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLlantas()
  }, [])

  return { llantas, loading, error, refetch: fetchLlantas }
}
