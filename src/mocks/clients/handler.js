import { http, HttpResponse } from 'msw'
import clientsMocks from '@services/clients/mocks.json'

let clients = [...clientsMocks]

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
