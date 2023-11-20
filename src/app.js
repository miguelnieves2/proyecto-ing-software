import express from 'express'
// Para usar import o la linea anterior se debe agregar:
// `"type": "module",` en package.json

import pacientesRoutes from './routes/pacientes.routes.js'
import indexRoutess from './routes/index.routes.js'


const app = express()

app.use(express.json())

app.use(indexRoutess)
app.use('/api', pacientesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;