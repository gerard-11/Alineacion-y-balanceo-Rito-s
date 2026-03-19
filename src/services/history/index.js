import { BaseService } from '@services/BaseService'
import mockData from './mocks.json'

class HistoryService extends BaseService {
  constructor() {
    // mockData is { sales: [...], serviceRecords: [...] }
    super('/history', mockData)
  }

  /**
   * Fetch sales history with optional filters.
   * @param {{ query?: string, clientId?: string, dateFrom?: string, dateTo?: string }} filters
   */
  getSales(filters = {}) {
    if (this.isLocal) {
      return Promise.resolve(this._applyFilters(this.mockData.sales ?? [], filters))
    }
    return this._get('sales', filters)
  }

  /**
   * Fetch service records with optional filters.
   * @param {{ query?: string, clientId?: string, dateFrom?: string, dateTo?: string }} filters
   */
  getServiceRecords(filters = {}) {
    if (this.isLocal) {
      return Promise.resolve(this._applyFilters(this.mockData.serviceRecords ?? [], filters))
    }
    return this._get('service-records', filters)
  }

  /** Local-mode filter helper — mirrors server-side filtering behaviour. */
  _applyFilters(data, { query = '', clientId = '', dateFrom = '', dateTo = '' }) {
    return data.filter(item => {
      if (query) {
        const q = query.toLowerCase()
        const clientName = item.client
          ? `${item.client.firstName} ${item.client.lastName}`.toLowerCase()
          : ''
        const itemNames = (item.items ?? []).map(i => i.name.toLowerCase()).join(' ')
        const serviceName = item.service?.name?.toLowerCase() ?? ''
        const folio = item.folio?.toLowerCase() ?? ''
        if (
          !clientName.includes(q) &&
          !itemNames.includes(q) &&
          !serviceName.includes(q) &&
          !folio.includes(q)
        ) return false
      }
      if (clientId && item.client?.id !== clientId) return false
      if (dateFrom && new Date(item.createdAt ?? item.date) < new Date(dateFrom)) return false
      if (dateTo) {
        const end = new Date(dateTo)
        end.setHours(23, 59, 59, 999)
        if (new Date(item.createdAt ?? item.date) > end) return false
      }
      return true
    })
  }
}

export const historyService = new HistoryService()
