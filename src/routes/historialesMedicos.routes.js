import { Router } from 'express'
import { getHistorialesMedicos, getHistorialMedico, createHistorialMedico, updateHistorialMedico, deleteHistorialMedico } from '../controllers/historialesMedicos.controller.js'

const router = Router()

router.get('/historialesmedicos', getHistorialesMedicos)

router.get('/historialesmedicos/:id', getHistorialMedico)

router.post('/historialesmedicos', createHistorialMedico)

router.patch('/historialesmedicos/:id', updateHistorialMedico)

router.delete('/historialesmedicos/:id', deleteHistorialMedico)

export default router
