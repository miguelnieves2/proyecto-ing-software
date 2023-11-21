import { Router } from 'express'
import { getMedicos, getMedico, createMedico, updateMedico, deleteMedico } from '../controllers/medicos.controller.js'

const router = Router()

router.get('/', getMedicos)

router.get('/:id', getMedico)

router.post('/', createMedico)

router.patch('/:id', updateMedico)

router.delete('/:id', deleteMedico)

export default router
