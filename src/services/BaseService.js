import { apiClient } from '@libs/axios'

/**
 * Abstract base class for all services.
 *
 * Subclasses receive HTTP helpers (_get, _post, _put, _patch, _delete)
 * and default CRUD methods (getAll, getById, create, update, remove).
 * Override any method to customise behaviour — especially for local mock mode.
 *
 * @example
 * class ProductsService extends BaseService {
 *   constructor() { super('/store/products', mockData) }
 * }
 * export const productsService = new ProductsService()
 */
export class BaseService {
  /**
   * @param {string} endpoint  Base API path, e.g. '/store/products'
   * @param {Array|Object|null} mockData  Returned as-is in local mode
   */
  constructor(endpoint, mockData = null) {
    this.endpoint = endpoint
    this.mockData = mockData
  }

  /** True when VITE_LOCAL=true (mock mode). Evaluated lazily per call. */
  get isLocal() {
    return import.meta.env.VITE_LOCAL === 'true'
  }

  // ─── Protected HTTP helpers ─────────────────────────────────────────────

  /**
   * GET request with optional sub-path and query params.
   * @param {string} path   Appended to endpoint: `${endpoint}/${path}`
   * @param {Object} params Serialised as ?key=value (nullish values omitted)
   */
  _get(path = '', params = null) {
    let url = path ? `${this.endpoint}/${path}` : this.endpoint
    if (params) {
      const qs = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null && v !== '')
        )
      ).toString()
      if (qs) url += `?${qs}`
    }
    return apiClient.request('GET', url)
  }

  /** POST to endpoint or endpoint/path */
  _post(path = '', data) {
    const url = path ? `${this.endpoint}/${path}` : this.endpoint
    return apiClient.request('POST', url, data)
  }

  /** PUT to endpoint/path */
  _put(path, data) {
    return apiClient.request('PUT', `${this.endpoint}/${path}`, data)
  }

  /** PATCH to endpoint/path */
  _patch(path, data) {
    return apiClient.request('PATCH', `${this.endpoint}/${path}`, data)
  }

  /** DELETE endpoint/path */
  _delete(path) {
    return apiClient.request('DELETE', `${this.endpoint}/${path}`)
  }

  // ─── Default CRUD — override in subclasses as needed ────────────────────

  getAll() {
    if (this.isLocal) return Promise.resolve(this.mockData ?? [])
    return this._get()
  }

  getById(id) {
    if (this.isLocal) {
      const item = (this.mockData ?? []).find(i => i.id === id) ?? null
      return Promise.resolve(item)
    }
    return this._get(String(id))
  }

  create(data) {
    if (this.isLocal) return Promise.resolve({ id: `mock-${Date.now()}`, ...data })
    return this._post('', data)
  }

  update(id, data) {
    if (this.isLocal) return Promise.resolve({ id, ...data })
    return this._put(String(id), data)
  }

  remove(id) {
    if (this.isLocal) return Promise.resolve({ id })
    return this._delete(String(id))
  }
}
