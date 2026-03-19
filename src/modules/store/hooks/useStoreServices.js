import { useState, useEffect } from 'react'
import { storeServicesService } from '@services'

export function useStoreServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await storeServicesService.getAll()
      setServices(data)
    } catch (err) {
      setError(err.message || 'Error al cargar servicios')
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return { services, loading, error, refetch: fetchServices }
}
