import { BaseService } from '@services/BaseService'
import mockData from './mocks.json'

class ClientsService extends BaseService {
  constructor() {
    super('/clients', mockData)
  }
}

export const clientsService = new ClientsService()
