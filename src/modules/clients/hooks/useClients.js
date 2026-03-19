import { useState, useEffect } from 'react'
import { clientsService } from '@services'

export function useClients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await clientsService.getAll()
      setClients(data)
    } catch (err) {
      setError(err.message || 'Error al cargar clientes')
      setClients([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return { clients, loading, error, refetch: fetchClients }
}
