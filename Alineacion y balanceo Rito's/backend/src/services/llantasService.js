import { supabaseClient, logRequest, logResponse, logError } from './apiClient.js'

export const llantasService = {
  async getAllLlantas() {
    try {
      logRequest('servicios_catalogo', 'select')

      const { data, error } = await supabaseClient
        .from('servicios_catalogo')
        .select('*')
        .ilike('nombre', '%llanta%')

      if (error) throw error

      logResponse('servicios_catalogo', 'select', data)

      return data.map(llanta => ({
        id: llanta.id,
        marca: llanta.nombre || 'Marca',
        modelo: 'Modelo',
        precio: llanta.precio_base,
        descripcion: 'Llanta de calidad'
      }))
    } catch (error) {
      logError('servicios_catalogo', 'select', error)
      throw error
    }
  },

  async getLlantaById(id) {
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

  async crearLlanta(data) {
    try {
      logRequest('servicios_catalogo', 'insert')

      const { data: result, error } = await supabaseClient
        .from('servicios_catalogo')
        .insert({
          nombre: `${data.marca} ${data.modelo}`,
          precio_base: data.precio
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

  async actualizarLlanta(id, data) {
    try {
      logRequest('servicios_catalogo', 'update')

      const { data: result, error } = await supabaseClient
        .from('servicios_catalogo')
        .update({
          nombre: data.nombre,
          precio_base: data.precio
        })
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

  async eliminarLlanta(id) {
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
