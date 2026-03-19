import { BaseService } from '@services/BaseService'
import mockData from './mocks.json'

class StoreProductsService extends BaseService {
  constructor() {
    super('/store/products', mockData)
  }
}

export const storeProductsService = new StoreProductsService()
