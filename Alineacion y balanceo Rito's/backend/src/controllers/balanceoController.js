import { balanceoService } from '../services/balanceoService.js'

export const balanceoController = {
  async getAll(req, res, next) {
    try {
      const servicios = await balanceoService.getAllServicios()
      res.json({ success: true, data: servicios })
    } catch (error) {
      next(error)
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const servicio = await balanceoService.getServicioById(id)
      res.json({ success: true, data: servicio })
    } catch (error) {
      next(error)
    }
  },

  async create(req, res, next) {
    try {
      const servicio = await balanceoService.crearServicio(req.body)
      res.status(201).json({ success: true, data: servicio })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params
      const servicio = await balanceoService.actualizarServicio(id, req.body)
      res.json({ success: true, data: servicio })
    } catch (error) {
      next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await balanceoService.eliminarServicio(id)
      res.json({ success: true, message: 'Servicio de balanceo eliminado correctamente' })
    } catch (error) {
      next(error)
    }
  }
}
