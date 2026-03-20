import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Create the MSW worker for the browser
export const worker = setupWorker(...handlers)

// Debug logging in development
if (import.meta.env.DEV) {
  // Log when a request starts
  worker.events.on('request:start', ({ request }) => {
    console.log('[MSW] Request start:', request.method, request.url)
  })

  // Log when a request is matched by a handler
  worker.events.on('request:match', ({ request }) => {
    console.log('[MSW] Request matched:', request.method, request.url)
  })

  // Log when a request is not matched
  worker.events.on('unhandledRequest', ({ request }) => {
    console.warn('[MSW] Unhandled request:', request.method, request.url)
  })

  // Log when the worker starts
  worker.events.on('workerStart', () => {
    console.log('[MSW] Worker started successfully')
  })
}
