import { ventasService } from '../services/ventasService.js'

export const ventasController = {
  async getAll(req, res, next) {
    try {
      const ventas = await ventasService.getAllVentas()
      res.json({ success: true, data: ventas })
    } catch (error) {
      next(error)
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const venta = await ventasService.getVentaById(id)
      res.json({ success: true, data: venta })
    } catch (error) {
      next(error)
    }
  },

  async create(req, res, next) {
    try {
      const venta = await ventasService.createVenta(req.body)
      res.status(201).json({ success: true, data: venta })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params
      const venta = await ventasService.updateVenta(id, req.body)
      res.json({ success: true, data: venta })
    } catch (error) {
      next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await ventasService.deleteVenta(id)
      res.json({ success: true, message: 'Venta eliminada correctamente' })
    } catch (error) {
      next(error)
    }
  }
}
