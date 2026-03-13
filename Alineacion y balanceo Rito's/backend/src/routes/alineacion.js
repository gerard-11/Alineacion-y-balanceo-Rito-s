import express from 'express'
import { alineacionController } from '../controllers/alineacionController.js'

const router = express.Router()

router.get('/', alineacionController.getAll)
router.get('/:id', alineacionController.getById)
router.post('/', alineacionController.create)
router.put('/:id', alineacionController.update)
router.delete('/:id', alineacionController.delete)

export default router
