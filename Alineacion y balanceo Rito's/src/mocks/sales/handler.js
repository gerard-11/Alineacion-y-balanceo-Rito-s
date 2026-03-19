import { http, HttpResponse } from 'msw'
import salesMocks from '@services/sales/mocks.json'

let sales = [...salesMocks]

export const salesHandlers = [
  // GET /sales
  http.get('/api/sales', () => {
    return HttpResponse.json(sales, { status: 200 })
  }),

  // GET /sales/:id
  http.get('/api/sales/:id', ({ params }) => {
    const sale = sales.find((s) => s.id === params.id)
    return sale
      ? HttpResponse.json(sale, { status: 200 })
      : HttpResponse.json({ error: 'Sale not found' }, { status: 404 })
  }),

  // POST /sales
  http.post('/api/sales', async ({ request }) => {
    const data = await request.json()
    const newSale = {
      id: `sale-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'completed',
      ...data,
    }
    sales.push(newSale)
    return HttpResponse.json(newSale, { status: 201 })
  }),

  // PUT /sales/:id
  http.put('/api/sales/:id', async ({ params, request }) => {
    const data = await request.json()
    const index = sales.findIndex((s) => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Sale not found' }, { status: 404 })
    }
    const updated = { ...sales[index], ...data }
    sales[index] = updated
    return HttpResponse.json(updated, { status: 200 })
  }),

  // DELETE /sales/:id
  http.delete('/api/sales/:id', ({ params }) => {
    const index = sales.findIndex((s) => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Sale not found' }, { status: 404 })
    }
    sales.splice(index, 1)
    return HttpResponse.json({ id: params.id }, { status: 200 })
  }),
]
