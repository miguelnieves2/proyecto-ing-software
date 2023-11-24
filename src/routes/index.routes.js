import { Router } from 'express'
import { ping } from '../controllers/index.controller.js'

const router = Router()

router.get('/ping', ping);

router.get('/acerca', (req, res) => {
    res.render('acerca');
});

router.get('/preguntas-frecuentes', (req, res) => {
    res.render('preguntas-frecuentes');
});


export default router