import { supabaseClient, logRequest, logResponse, logError } from './apiClient.js'

export const ventasService = {
  async getAllVentas() {
    try {
      logRequest('ordenes_trabajo', 'select')

      const { data, error } = await supabaseClient
        .from('ordenes_trabajo')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      logResponse('ordenes_trabajo', 'select', data)

      // Transformar datos al formato del frontend
      return data.map(orden => ({
        id: orden.id,
        cliente: orden.cliente_nombre || 'N/A',
        servicio: orden.vehiculo_placa || 'Alineación/Balanceo',
        monto: '$0.00',
        estado: orden.estado || 'pendiente'
      }))
    } catch (error) {
      logError('ordenes_trabajo', 'select', error)
      throw error
    }
  },

  async getVentaById(id) {
    try {
      logRequest('ordenes_trabajo', 'select')

      const { data, error } = await supabaseClient
        .from('ordenes_trabajo')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      logResponse('ordenes_trabajo', 'select', data)
      return data
    } catch (error) {
      logError('ordenes_trabajo', 'select', error)
      throw error
    }
  },

  async createVenta(data) {
    try {
      logRequest('ordenes_trabajo', 'insert')

      const { data: result, error } = await supabaseClient
        .from('ordenes_trabajo')
        .insert({
          cliente_nombre: data.cliente_nombre,
          vehiculo_placa: data.vehiculo_placa,
          estado: data.estado || 'pendiente',
          created_at: new Date().toISOString()
        })
        .select()

      if (error) throw error

      logResponse('ordenes_trabajo', 'insert', result)
      return result[0]
    } catch (error) {
      logError('ordenes_trabajo', 'insert', error)
      throw error
    }
  },

  async updateVenta(id, data) {
    try {
      logRequest('ordenes_trabajo', 'update')

      const { data: result, error } = await supabaseClient
        .from('ordenes_trabajo')
        .update(data)
        .eq('id', id)
        .select()

      if (error) throw error

      logResponse('ordenes_trabajo', 'update', result)
      return result[0]
    } catch (error) {
      logError('ordenes_trabajo', 'update', error)
      throw error
    }
  },

  async deleteVenta(id) {
    try {
      logRequest('ordenes_trabajo', 'delete')

      const { error } = await supabaseClient
        .from('ordenes_trabajo')
        .delete()
        .eq('id', id)

      if (error) throw error

      logResponse('ordenes_trabajo', 'delete', { id })
      return { success: true }
    } catch (error) {
      logError('ordenes_trabajo', 'delete', error)
      throw error
    }
  }
}
