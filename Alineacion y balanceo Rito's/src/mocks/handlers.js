import { http, HttpResponse } from 'msw'
import salesMocks from '@services/sales/mocks.json'
import productsMocks from '@services/storeProducts/mocks.json'
import servicesMocks from '@services/storeServices/mocks.json'
import clientsMocks from '@services/clients/mocks.json'
import inventoryMocks from '@services/inventory/mocks.json'
import historyMocks from '@services/history/mocks.json'

// Estado en memoria para operaciones CRUD
let sales = [...salesMocks]
let products = [...productsMocks]
let services = [...servicesMocks]
let clients = [...clientsMocks]
let inventory = [...inventoryMocks]

// ─── SALES HANDLERS ────────────────────────────────────────────────────────

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

// ─── PRODUCTS HANDLERS ──────────────────────────────────────────────────────

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

// ─── SERVICES HANDLERS ─────────────────────────────────────────────────────

export const servicesHandlers = [
  // GET /store/services
  http.get('/api/store/services', () => {
    return HttpResponse.json(services, { status: 200 })
  }),

  // GET /store/services/:id
  http.get('/api/store/services/:id', ({ params }) => {
    const service = services.find((s) => s.id === params.id)
    return service
      ? HttpResponse.json(service, { status: 200 })
      : HttpResponse.json({ error: 'Service not found' }, { status: 404 })
  }),

  // POST /store/services
  http.post('/api/store/services', async ({ request }) => {
    const data = await request.json()
    const newService = {
      id: `svc-${Date.now()}`,
      ...data,
    }
    services.push(newService)
    return HttpResponse.json(newService, { status: 201 })
  }),

  // PUT /store/services/:id
  http.put('/api/store/services/:id', async ({ params, request }) => {
    const data = await request.json()
    const index = services.findIndex((s) => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Service not found' }, { status: 404 })
    }
    const updated = { ...services[index], ...data }
    services[index] = updated
    return HttpResponse.json(updated, { status: 200 })
  }),

  // DELETE /store/services/:id
  http.delete('/api/store/services/:id', ({ params }) => {
    const index = services.findIndex((s) => s.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Service not found' }, { status: 404 })
    }
    services.splice(index, 1)
    return HttpResponse.json({ id: params.id }, { status: 200 })
  }),
]

// ─── CLIENTS HANDLERS ──────────────────────────────────────────────────────

export const clientsHandlers = [
  // GET /clients
  http.get('/api/clients', () => {
    return HttpResponse.json(clients, { status: 200 })
  }),

  // GET /clients/:id
  http.get('/api/clients/:id', ({ params }) => {
    const client = clients.find((c) => c.id === params.id)
    return client
      ? HttpResponse.json(client, { status: 200 })
      : HttpResponse.json({ error: 'Client not found' }, { status: 404 })
  }),

  // POST /clients
  http.post('/api/clients', async ({ request }) => {
    const data = await request.json()
    const newClient = {
      id: `cli-${Date.now()}`,
      ...data,
    }
    clients.push(newClient)
    return HttpResponse.json(newClient, { status: 201 })
  }),

  // PUT /clients/:id
  http.put('/api/clients/:id', async ({ params, request }) => {
    const data = await request.json()
    const index = clients.findIndex((c) => c.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    const updated = { ...clients[index], ...data }
    clients[index] = updated
    return HttpResponse.json(updated, { status: 200 })
  }),

  // DELETE /clients/:id
  http.delete('/api/clients/:id', ({ params }) => {
    const index = clients.findIndex((c) => c.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    clients.splice(index, 1)
    return HttpResponse.json({ id: params.id }, { status: 200 })
  }),
]

// ─── INVENTORY HANDLERS ────────────────────────────────────────────────────

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

// ─── HISTORY HANDLERS ──────────────────────────────────────────────────────

export const historyHandlers = [
  // GET /history/sales
  http.get('/api/history/sales', () => {
    return HttpResponse.json(historyMocks.sales, { status: 200 })
  }),

  // GET /history/services
  http.get('/api/history/services', () => {
    return HttpResponse.json(historyMocks.serviceRecords, { status: 200 })
  }),
]

// ─── EXPORT ALL HANDLERS ──────────────────────────────────────────────────

export const handlers = [
  ...salesHandlers,
  ...productsHandlers,
  ...servicesHandlers,
  ...clientsHandlers,
  ...inventoryHandlers,
  ...historyHandlers,
]
