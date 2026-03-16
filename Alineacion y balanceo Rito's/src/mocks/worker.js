import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Crear el worker MSW para el navegador
export const worker = setupWorker(...handlers)

// Logs de depuración (opcional)
if (import.meta.env.DEV) {
  worker.events.on('request:start', ({ request }) => {
    console.log('[MSW]', request.method, request.url)
  })
}
