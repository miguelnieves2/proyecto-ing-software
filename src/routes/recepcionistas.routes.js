import { Router } from 'express'
import { getRecepcionistas, getRecepcionista, createRecepcionista, updateRecepcionista, deleteRecepcionista } from '../controllers/recepcionistas.controller.js'

const router = Router()

router.get('/recepcionistas', getRecepcionistas)

router.get('/recepcionistas/:id', getRecepcionista)

router.post('/recepcionistas', createRecepcionista)

router.patch('/recepcionistas/:id', updateRecepcionista)

router.delete('/recepcionistas/:id', deleteRecepcionista)

export default router
