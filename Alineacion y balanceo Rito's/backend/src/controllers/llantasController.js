import { llantasService } from '../services/llantasService.js'

export const llantasController = {
  async getAll(req, res, next) {
    try {
      const llantas = await llantasService.getAllLlantas()
      res.json({ success: true, data: llantas })
    } catch (error) {
      next(error)
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params
      const llanta = await llantasService.getLlantaById(id)
      res.json({ success: true, data: llanta })
    } catch (error) {
      next(error)
    }
  },

  async create(req, res, next) {
    try {
      const llanta = await llantasService.crearLlanta(req.body)
      res.status(201).json({ success: true, data: llanta })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params
      const llanta = await llantasService.actualizarLlanta(id, req.body)
      res.json({ success: true, data: llanta })
    } catch (error) {
      next(error)
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await llantasService.eliminarLlanta(id)
      res.json({ success: true, message: 'Llanta eliminada correctamente' })
    } catch (error) {
      next(error)
    }
  }
}
