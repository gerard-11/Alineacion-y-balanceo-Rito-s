import express from 'express'
import { llantasController } from '../controllers/llantasController.js'

const router = express.Router()

router.get('/', llantasController.getAll)
router.get('/:id', llantasController.getById)
router.post('/', llantasController.create)
router.put('/:id', llantasController.update)
router.delete('/:id', llantasController.delete)

export default router
