import { BaseService } from '@services/BaseService'
import mockData from './mocks.json'

class SalesService extends BaseService {
  constructor() {
    super('/sales', mockData)
  }

  /** Override create to return a proper sale envelope in local mode. */
  create(data) {
    if (this.isLocal) {
      const folio = `VTA-2026-${String(Math.floor(Math.random() * 900) + 100)}`
      const subtotalAmount = data.items.reduce((s, i) => s + i.unitPrice * i.qty, 0)
      const taxAmount = data.items.reduce((s, i) => s + i.unitPrice * i.qty * (i.taxRate ?? 0.16), 0)
      return Promise.resolve({
        id: `sale-${Date.now()}`,
        folio,
        createdAt: new Date().toISOString(),
        status: 'completed',
        subtotalAmount,
        taxAmount,
        totalAmount: subtotalAmount + taxAmount,
        ...data,
      })
    }
    return this._post('', data)
  }
}

export const salesService = new SalesService()
