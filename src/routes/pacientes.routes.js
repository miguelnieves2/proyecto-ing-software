import { Router } from 'express'
import { getPacientes, getPaciente, createPaciente, updatePaciente, deletePaciente } from '../controllers/pacientes.controller.js'
import { isLoggedIn } from '../lib/auth.js'

const router = Router()

// Crear la vista /home-paciente
router.get('/home-paciente', (req, res) => {
    res.render('pacientes/home-paciente')
})


router.get('/pacientes', getPacientes)

router.get('/pacientes/:id', getPaciente)

router.post('/pacientes', createPaciente)

router.patch('/pacientes/:id', updatePaciente)

router.delete('/pacientes/:id', deletePaciente)


export default router