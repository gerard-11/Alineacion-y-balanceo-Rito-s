import { http, HttpResponse } from 'msw'
import productsMocks from '@services/storeProducts/mocks.json'

let products = [...productsMocks]

export const productsHandlers = [
  // GET /store/products
  http.get('/api/store/products', () => {
    return HttpResponse.json(products, { status: 200 })
  }),

  // GET /store/products/:id
  http.get('/api/store/products/:id', ({ params }) => {
    const product = products.find((p) => p.id === params.id)
    return product
      ? HttpResponse.json(product, { status: 200 })
      : HttpResponse.json({ error: 'Product not found' }, { status: 404 })
  }),

  // POST /store/products
  http.post('/api/store/products', async ({ request }) => {
    const data = await request.json()
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...data,
    }
    products.push(newProduct)
    return HttpResponse.json(newProduct, { status: 201 })
  }),

  // PUT /store/products/:id
  http.put('/api/store/products/:id', async ({ params, request }) => {
    const data = await request.json()
    const index = products.findIndex((p) => p.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    const updated = { ...products[index], ...data }
    products[index] = updated
    return HttpResponse.json(updated, { status: 200 })
  }),

  // DELETE /store/products/:id
  http.delete('/api/store/products/:id', ({ params }) => {
    const index = products.findIndex((p) => p.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    products.splice(index, 1)
    return HttpResponse.json({ id: params.id }, { status: 200 })
  }),
]
