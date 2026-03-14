import { BaseService } from '@services/BaseService'
import mockData from './mocks.json'

class StoreServicesService extends BaseService {
  constructor() {
    super('/store/services', mockData)
  }
}

export const storeServicesService = new StoreServicesService()
