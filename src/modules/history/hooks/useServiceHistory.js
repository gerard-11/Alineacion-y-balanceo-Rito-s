import { useState, useEffect } from 'react'
import { historyService } from '@services'

export function useServiceHistory(filters = {}) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await historyService.getServiceRecords(filters)
        if (!cancelled) setRecords(data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Error al cargar registros de servicio')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.query, filters.clientId, filters.dateFrom, filters.dateTo])

  return { records, loading, error }
}
