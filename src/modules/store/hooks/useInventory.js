import { useState, useEffect, useCallback } from 'react'
import { inventoryService } from '@services'

export function useInventory() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [adjusting, setAdjusting] = useState(false)

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await inventoryService.getAll()
      setInventory(data)
    } catch (err) {
      setError(err.message || 'Error al cargar inventario')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  const adjustStock = async (id, delta, reason) => {
    setAdjusting(true)
    try {
      await inventoryService.adjust(id, delta, reason)
      await fetchInventory()
    } catch (err) {
      throw new Error(err.message || 'Error al ajustar stock')
    } finally {
      setAdjusting(false)
    }
  }

  return { inventory, loading, error, adjusting, adjustStock, refetch: fetchInventory }
}
