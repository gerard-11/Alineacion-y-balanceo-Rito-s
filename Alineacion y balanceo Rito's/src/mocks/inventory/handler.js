import { http, HttpResponse } from 'msw'
import inventoryMocks from '@services/inventory/mocks.json'

let inventory = [...inventoryMocks]

export const inventoryHandlers = [
  // GET /inventory
  http.get('/api/inventory', () => {
    return HttpResponse.json(inventory, { status: 200 })
  }),

  // GET /inventory/:id
  http.get('/api/inventory/:id', ({ params }) => {
    const item = inventory.find((i) => i.id === params.id)
    return item
      ? HttpResponse.json(item, { status: 200 })
      : HttpResponse.json({ error: 'Inventory item not found' }, { status: 404 })
  }),

  // POST /inventory
  http.post('/api/inventory', async ({ request }) => {
    const data = await request.json()
    const newItem = {
      id: `inv-${Date.now()}`,
      updatedAt: new Date().toISOString(),
      ...data,
    }
    inventory.push(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),

  // PUT /inventory/:id
  http.put('/api/inventory/:id', async ({ params, request }) => {
    const data = await request.json()
    const index = inventory.findIndex((i) => i.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Inventory item not found' }, { status: 404 })
    }
    const updated = { ...inventory[index], ...data, updatedAt: new Date().toISOString() }
    inventory[index] = updated
    return HttpResponse.json(updated, { status: 200 })
  }),

  // DELETE /inventory/:id
  http.delete('/api/inventory/:id', ({ params }) => {
    const index = inventory.findIndex((i) => i.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Inventory item not found' }, { status: 404 })
    }
    inventory.splice(index, 1)
    return HttpResponse.json({ id: params.id }, { status: 200 })
  }),
]
