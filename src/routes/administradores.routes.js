import { Router } from 'express'
import { getAdministradores, getAdministrador, createAdministrador, updateAdministrador, deleteAdministrador } from '../controllers/administradores.controller.js'

const router = Router()

router.get('/administradores', getAdministradores)

router.get('/administradores/:id', getAdministrador)

router.post('/administradores', createAdministrador)

router.patch('/administradores/:id', updateAdministrador)

router.delete('/administradores/:id', deleteAdministrador)

export default router
