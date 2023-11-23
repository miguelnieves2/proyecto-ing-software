import express from 'express';
// Para usar import o la linea anterior se debe agregar:
// `"type": "module",` en package.json

import { engine } from 'express-handlebars';

import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


import flash from 'connect-flash';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import passport from 'passport'

import {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
} from './config.js'


// Importaciones de rutas:
import AuthRoutes from './routes/authentication.js'

import administradoresRoutes from './routes/administradores.routes.js'
import recepcionistasRoutes from './routes/recepcionistas.routes.js'
import medicosRoutes from './routes/medicos.routes.js'
import pacientesRoutes from './routes/pacientes.routes.js'
import indexRoutes from './routes/index.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializaciones
const app = express()
const MySQLStore = MySQLStoreFactory(session);
import './lib/passport.js'

// Verifica si el usuario inicio sesión y cumple con el rol para mostrar (o redigir) una ruta.
import { isLoggedIn, checkRole, redirectToRoleBasedHome } from './lib/auth.js'

// Configuraciones
app.set('views', path.join(__dirname, 'views'))

// Middlewares
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

app.use(session({
    secret: 'proyecto-software-session',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    })
}))
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(passport.initialize());
app.use(passport.session())

// Variables globales
app.use((req, res, next) => {
    app.locals.exitoso = req.flash('exitoso')
    app.locals.mensaje = req.flash('mensaje')
    app.locals.usuario = req.user;
    next();
})

// Sirve los archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));


// Creación de Routes
app.get('/', redirectToRoleBasedHome); // Ruta raiz lo redirije siempre que no inicie sesion a http:link/iniciar-sesion
app.use(indexRoutes) // Ruta de /pong
app.use(AuthRoutes)
app.use('/admin', checkRole('administrador'), isLoggedIn, administradoresRoutes);
app.use('/medico', checkRole('medico'), isLoggedIn, medicosRoutes);
app.use('/recepcionista', checkRole('recepcionista'), isLoggedIn, recepcionistasRoutes);
app.use('/paciente', checkRole('paciente'), isLoggedIn, pacientesRoutes);

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


export default app;
