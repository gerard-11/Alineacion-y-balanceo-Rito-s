import express from 'express'
import ventasRouter from './ventas.js'
import alineacionRouter from './alineacion.js'
import balanceoRouter from './balanceo.js'
import llantasRouter from './llantas.js'

const router = express.Router()

router.use('/ventas', ventasRouter)
router.use('/alineacion', alineacionRouter)
router.use('/balanceo', balanceoRouter)
router.use('/llantas', llantasRouter)

export default router
