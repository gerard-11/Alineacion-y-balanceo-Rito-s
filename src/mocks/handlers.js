import { http, HttpResponse } from 'msw'
import { salesHandlers } from './sales/handler'
import { productsHandlers } from './products/handler'
import { servicesHandlers } from './services/handler'
import { clientsHandlers } from './clients/handler'
import { inventoryHandlers } from './inventory/handler'
import { historyHandlers } from './history/handler'

export { salesHandlers, productsHandlers, servicesHandlers, clientsHandlers, inventoryHandlers, historyHandlers }

// Catch-all handler for debugging unhandled requests
const debugHandler = http.all('*', ({ request }) => {
  console.warn(`[MSW] Unhandled request: ${request.method} ${request.url}`)
  return new HttpResponse(null, { status: 404 })
})

export const handlers = [
  ...salesHandlers,
  ...productsHandlers,
  ...servicesHandlers,
  ...clientsHandlers,
  ...inventoryHandlers,
  ...historyHandlers,
  debugHandler, // Must be last to catch unhandled requests
]
