import { Router } from 'express'
import { getAgendas, getAgenda, createAgenda, updateAgenda, deleteAgenda } from '../controllers/agendas.controller.js'

const router = Router()

router.get('/agendas', getAgendas)

router.get('/agendas/:id', getAgenda)

router.post('/agendas', createAgenda)

router.patch('/agendas/:id', updateAgenda)

router.delete('/agendas/:id', deleteAgenda)

export default router
