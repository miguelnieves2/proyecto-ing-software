import { Router } from 'express'
import { getRecepcionistas, getRecepcionista, createRecepcionista, updateRecepcionista, deleteRecepcionista } from '../controllers/recepcionistas.controller.js'

const router = Router()

// Crear la vista /home-recepcionista
router.get('/home-recepcionista', (req, res) => {
    res.render('recepcionistas/home-recepcionista')
})

router.get('/recepcionistas', getRecepcionistas)

router.get('/recepcionistas/:id', getRecepcionista)

router.post('/recepcionistas', createRecepcionista)

router.patch('/recepcionistas/:id', updateRecepcionista)

router.delete('/recepcionistas/:id', deleteRecepcionista)

export default router
