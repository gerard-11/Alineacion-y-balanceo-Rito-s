import { http, HttpResponse } from 'msw'
import servicesMocks from '@services/storeServices/mocks.json'

let services = [...servicesMocks]

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
