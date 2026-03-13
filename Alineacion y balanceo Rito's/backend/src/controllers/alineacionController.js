import { alineacionService } from '../services/alineacionService.js'

export const alineacionController = {
  async getAll(req, res, next) {
    try {
      const servicios = await alineacionService.getAllServicios()
      res.json({ success: true, data: servicios })
    } catch (error) {
      next(error)
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const servicio = await alineacionService.getServicioById(id)
      res.json({ success: true, data: servicio })
    } catch (error) {
      next(error)
    }
  },

  async create(req, res, next) {
    try {
      const servicio = await alineacionService.crearServicio(req.body)
      res.status(201).json({ success: true, data: servicio })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params
      const servicio = await alineacionService.actualizarServicio(id, req.body)
      res.json({ success: true, data: servicio })
    } catch (error) {
      next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await alineacionService.eliminarServicio(id)
      res.json({ success: true, message: 'Servicio de alineación eliminado correctamente' })
    } catch (error) {
      next(error)
    }
  }
}
