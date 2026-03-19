import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Crear el servidor MSW con los handlers
export const server = setupServer(...handlers)
