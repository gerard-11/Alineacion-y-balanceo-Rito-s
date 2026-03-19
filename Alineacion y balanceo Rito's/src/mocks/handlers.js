import { salesHandlers } from './sales/handler'
import { productsHandlers } from './products/handler'
import { servicesHandlers } from './services/handler'
import { clientsHandlers } from './clients/handler'
import { inventoryHandlers } from './inventory/handler'
import { historyHandlers } from './history/handler'

export { salesHandlers, productsHandlers, servicesHandlers, clientsHandlers, inventoryHandlers, historyHandlers }

export const handlers = [
  ...salesHandlers,
  ...productsHandlers,
  ...servicesHandlers,
  ...clientsHandlers,
  ...inventoryHandlers,
  ...historyHandlers,
]
