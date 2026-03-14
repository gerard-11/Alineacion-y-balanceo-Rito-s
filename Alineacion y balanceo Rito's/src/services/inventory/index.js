import { BaseService } from '@services/BaseService'
import mockData from './mocks.json'

class InventoryService extends BaseService {
  constructor() {
    super('/inventory', mockData)
  }

  /**
   * Adjust stock for an inventory item.
   * @param {string} id     Inventory item id
   * @param {number} delta  Positive = entrada, Negative = salida
   * @param {string} reason Description of the adjustment
   */
  adjust(id, delta, reason) {
    if (this.isLocal) return Promise.resolve({ success: true, id, delta, reason })
    return this._patch(`${id}/adjust`, { delta, reason })
  }
}

export const inventoryService = new InventoryService()
