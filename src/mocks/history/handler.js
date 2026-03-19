import { http, HttpResponse } from 'msw'
import historyMocks from '@services/history/mocks.json'

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
