const API_BASE_URL = '/api'

class APIClient {
  async request(method, endpoint, data = null) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error)
      throw error
    }
  }

  ventas = {
    getAll: () => this.request('GET', '/ventas'),
    getById: (id) => this.request('GET', `/ventas/${id}`),
    create: (data) => this.request('POST', '/ventas', data),
    update: (id, data) => this.request('PUT', `/ventas/${id}`, data),
    delete: (id) => this.request('DELETE', `/ventas/${id}`)
  }

  alineacion = {
    getAll: () => this.request('GET', '/alineacion'),
    getById: (id) => this.request('GET', `/alineacion/${id}`),
    create: (data) => this.request('POST', '/alineacion', data),
    update: (id, data) => this.request('PUT', `/alineacion/${id}`, data),
    delete: (id) => this.request('DELETE', `/alineacion/${id}`)
  }

  balanceo = {
    getAll: () => this.request('GET', '/balanceo'),
    getById: (id) => this.request('GET', `/balanceo/${id}`),
    create: (data) => this.request('POST', '/balanceo', data),
    update: (id, data) => this.request('PUT', `/balanceo/${id}`, data),
    delete: (id) => this.request('DELETE', `/balanceo/${id}`)
  }

  llantas = {
    getAll: () => this.request('GET', '/llantas'),
    getById: (id) => this.request('GET', `/llantas/${id}`),
    create: (data) => this.request('POST', '/llantas', data),
    update: (id, data) => this.request('PUT', `/llantas/${id}`, data),
    delete: (id) => this.request('DELETE', `/llantas/${id}`)
  }
}

export const apiClient = new APIClient()
