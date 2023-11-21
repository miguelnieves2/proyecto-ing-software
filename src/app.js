import express from 'express';
// Para usar import o la linea anterior se debe agregar:
// `"type": "module",` en package.json

import { engine } from 'express-handlebars';

import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


import administradoresRoutes from './routes/administradores.routes.js'
import medicosRoutes from './routes/medicos.routes.js'
import pacientesRoutes from './routes/pacientes.routes.js'
import indexRoutes from './routes/index.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializaciones
const app = express()

// Configuraciones
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        eq: (v1, v2) => v1 === v2 // Aquí defines tu helper personalizado
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))

// Variables globales
// app.use((req, res, next) => { // TODO: VIDEO FRONT
//     next();
// })


// Routes
app.use(indexRoutes) // Ruta de /pong
app.use('/api', pacientesRoutes)
app.use('/medicos', medicosRoutes)
app.use('/admin', administradoresRoutes)

// Routes para más adelante
// app.use(require('./routes'))
// app.use(require('./routes/authentication.js'))
// app.use(require('/links', './routes/links.js')) //TODO: LINKS NO ES, ES PACIENTE


// Middleware para manejar rutas no encontradas - debe ser el último
app.use((req, res, next) => { //TODO: REVISAR Y VOLVER A PONER DEL VIDEO 1
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

// Public
app.use(express.static(path.join(__dirname, 'public')))

export default app;
