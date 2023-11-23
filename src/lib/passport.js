import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';

import { createPaciente, getPaciente, getPacientePorEmail } from '../controllers/pacientes.controller.js'
import helpers from '../lib/helpers.js';
import { buscarUsuarioPorEmail, buscarUsuarioPorIdYRol } from './userManagement.js';

passport.use('local.iniciar-sesion', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, email, contraseña, done) => {

    // Comprobar el usuario.
    const usuario = await buscarUsuarioPorEmail(email);
    console.log(`Passport: usuario encontrado es:`, usuario);
    if (usuario) {
        // Validar contraseña : devuelve true or false
        const contraseñaValida = await helpers.compararContraseña(contraseña, usuario.contraseña);

        if (contraseñaValida) {
            console.log('Passport.js: Usuario autenticado ', usuario)
            done(null, usuario, req.flash('exitoso', '¡Bienvenido!'));
        } else {
            done(null, false, req.flash('mensaje', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('mensaje', 'Correo electrónico no existe.'));
    }
}));


passport.use('local.registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'contraseña',
    passReqToCallback: true
}, async (req, email, contraseña, done) => {

    const { documento_identidad, nombre, fecha_nacimiento, tipo_sangre, prestadora_servicios, numero_celular } = req.body;
    const nuevoUsuario = {
        documento_identidad,
        nombre,
        fecha_nacimiento,
        tipo_sangre,
        prestadora_servicios,
        email,
        contraseña,
        numero_celular
    };

    nuevoUsuario.contraseña = await helpers.encryptContraseña(contraseña);

    try {
        console.log('mostrar datos para createPaciente', nuevoUsuario);
        const result = await createPaciente(nuevoUsuario);
        console.log('resultado de crearPaciente', result);
        nuevoUsuario.id = result;
        return done(null, nuevoUsuario);
    } catch (error) {
        return done(error);
    }
}));

// Para guardar en sesión:
// Es decir, cuando serializo, guardo el id del usuario
passport.serializeUser((usuario, done) => {
    done(null, { id: usuario.id, rol: usuario.rol });
});


// Cuando deserializo, tomo ese id almacenado para volver a tomar los datos.
passport.deserializeUser(async ({ id, rol }, done) => {
    try {
        const usuario = await buscarUsuarioPorIdYRol(id, rol);
        console.log('passport.js: el usuario a buscar es:', usuario);
        done(null, usuario);
    } catch (error) {
        done(error, null);
    }
});


export default passport;