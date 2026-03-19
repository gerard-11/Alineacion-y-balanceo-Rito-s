import { useState, useEffect } from 'react'
import { storeProductsService } from '@services'

export function useStoreProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await storeProductsService.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Error al cargar productos')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, loading, error, refetch: fetchProducts }
}
