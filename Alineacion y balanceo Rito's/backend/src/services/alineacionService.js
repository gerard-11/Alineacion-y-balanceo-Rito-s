import { supabaseClient, logRequest, logResponse, logError } from './apiClient.js'

export const alineacionService = {
  async getAllServicios() {
    try {
      logRequest('servicios_catalogo', 'select')

      const { data, error } = await supabaseClient
        .from('servicios_catalogo')
        .select('*')
        .ilike('nombre', '%alineacion%')

      if (error) throw error

      logResponse('servicios_catalogo', 'select', data)

      return data.map(servicio => ({
        id: servicio.id,
        nombre: servicio.nombre || 'Alineación',
        precio_base: servicio.precio_base,
        descripcion: 'Servicio de alineación de ruedas'
      }))
    } catch (error) {
      logError('servicios_catalogo', 'select', error)
      throw error
    }
  },

  async getServicioById(id) {
    try {
      logRequest('servicios_catalogo', 'select')

      const { data, error } = await supabaseClient
        .from('servicios_catalogo')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      logResponse('servicios_catalogo', 'select', data)
      return data
    } catch (error) {
      logError('servicios_catalogo', 'select', error)
      throw error
    }
  },

  async crearServicio(data) {
    try {
      logRequest('servicios_catalogo', 'insert')

      const { data: result, error } = await supabaseClient
        .from('servicios_catalogo')
        .insert({
          nombre: data.nombre,
          precio_base: data.precio_base
        })
        .select()

      if (error) throw error

      logResponse('servicios_catalogo', 'insert', result)
      return result[0]
    } catch (error) {
      logError('servicios_catalogo', 'insert', error)
      throw error
    }
  },

  async actualizarServicio(id, data) {
    try {
      logRequest('servicios_catalogo', 'update')

      const { data: result, error } = await supabaseClient
        .from('servicios_catalogo')
        .update(data)
        .eq('id', id)
        .select()

      if (error) throw error

      logResponse('servicios_catalogo', 'update', result)
      return result[0]
    } catch (error) {
      logError('servicios_catalogo', 'update', error)
      throw error
    }
  },

  async eliminarServicio(id) {
    try {
      logRequest('servicios_catalogo', 'delete')

      const { error } = await supabaseClient
        .from('servicios_catalogo')
        .delete()
        .eq('id', id)

      if (error) throw error

      logResponse('servicios_catalogo', 'delete', { id })
      return { success: true }
    } catch (error) {
      logError('servicios_catalogo', 'delete', error)
      throw error
    }
  }
}
