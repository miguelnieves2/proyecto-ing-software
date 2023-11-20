import { Router } from 'express'
import { getPacientes, getPaciente, createPaciente, updatePaciente, deletePaciente } from '../controllers/pacientes.controller.js'

const router = Router()

router.get('/pacientes', getPacientes)

router.get('/pacientes/:id', getPaciente)

router.post('/pacientes', createPaciente)

router.patch('/pacientes/:id', updatePaciente)

router.delete('/pacientes/:id', deletePaciente)


export default router