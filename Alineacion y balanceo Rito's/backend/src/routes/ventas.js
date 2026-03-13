import express from 'express'
import { ventasController } from '../controllers/ventasController.js'

const router = express.Router()

router.get('/', ventasController.getAll)
router.get('/:id', ventasController.getById)
router.post('/', ventasController.create)
router.put('/:id', ventasController.update)
router.delete('/:id', ventasController.delete)

export default router
