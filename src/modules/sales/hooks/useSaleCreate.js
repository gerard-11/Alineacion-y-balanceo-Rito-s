import { useState } from 'react'
import { salesService } from '@services'

export function useSaleCreate() {
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState(null)

  const createSale = async (data) => {
    setCreating(true)
    setError(null)
    try {
      return await salesService.create(data)
    } catch (err) {
      const message = err.message || 'Error al registrar la venta'
      setError(message)
      throw new Error(message)
    } finally {
      setCreating(false)
    }
  }

  return { createSale, creating, error }
}
