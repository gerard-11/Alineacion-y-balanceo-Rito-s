import express from 'express'
import { balanceoController } from '../controllers/balanceoController.js'

const router = express.Router()

router.get('/', balanceoController.getAll)
router.get('/:id', balanceoController.getById)
router.post('/', balanceoController.create)
router.put('/:id', balanceoController.update)
router.delete('/:id', balanceoController.delete)

export default router
